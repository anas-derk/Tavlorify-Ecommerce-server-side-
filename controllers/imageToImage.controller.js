async function getAllCategoriesData(req, res) {
    try{
        const { getAllCategoriesData } = require("../models/imageToImageCategories.model");
        const result = await getAllCategoriesData();
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function get_all_category_Styles_Data(req, res) {
    try{
        const categoryName = req.query.categoryName;
        const { get_all_category_Styles_Data } = require("../models/imageToImageStyles.model");
        const result = await get_all_category_Styles_Data(categoryName);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function uploadImageAndProcessing(req, res) {
    try {
        const sharp = require("sharp");
        const filePath = `assets/images/uploadedImages/image${Date.now()}_${Math.random()}.jpg`;
        await sharp(req.file.buffer).withMetadata().rotate().toFile(filePath);
        await res.json(`https://newapi.tavlorify.se/${filePath}`);
    }
    catch(err) {
        const { unlinkSync } = require("fs");
        unlinkSync(filePath);
        await res.status(500).json(err);
    }
}

async function runModel(model, input) {
    try {
        const Replicate = require("replicate");
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });
        const output = await replicate.run(
            model, { input, },
        );
        return output;
    } catch (err) {
        throw Error(err);
    }
}

async function saveNewGeneratedImageDataGlobalFunc(generatingInfo, generatedImageAsArrayBuffer) {
    try{
        const sharp = require("sharp");
        const { width, height } = await sharp(generatedImageAsArrayBuffer).metadata();
        const { saveNewGeneratedImageData } = require("../models/generatedImages.model");
        if (generatingInfo.service === "image-to-image") {
            let imageOrientation = "", size = "";
            if (width < height) {
                imageOrientation = "vertical";
                size = "50x70";
            }
            else if (width > height) {
                imageOrientation = "horizontal";
                size = "70x50";
            }
            else {
                imageOrientation = "square";
                size = "30x30";
            }
            await saveNewGeneratedImageData({
                service: generatingInfo.service,
                uploadedImageURL: generatingInfo.imageLink,
                categoryName: generatingInfo.categoryName,
                styleName: generatingInfo.styleName,
                paintingType: generatingInfo.paintingType,
                position: imageOrientation,
                size: size,
                isExistWhiteBorder: generatingInfo.isExistWhiteBorder,
                width: width,
                height: height,
                frameColor: generatingInfo.frameColor,
                generatedImageURL: generatingInfo.generatedImageURL,
            });
        } else if (generatingInfo.service === "text-to-image") {
            await saveNewGeneratedImageData({
                service: generatingInfo.service,
                categoryName: generatingInfo.categoryName,
                styleName: generatingInfo.styleName,
                paintingType: generatingInfo.paintingType,
                position: generatingInfo.position,
                size: generatingInfo.dimentionsInCm,
                isExistWhiteBorder: generatingInfo.isExistWhiteBorder,
                width: width,
                height: height,
                frameColor: generatingInfo.frameColor,
                generatedImageURL: generatingInfo.generatedImageURL,
            });
        }
    }
    catch(err) {
        console.log(err);
    }
}

async function generateImage(req, res) {
    let generatedImagePathInServer = "", generatedImageAsArrayBuffer;
    const imageToImageInfo = req.query;
    try {
        switch (imageToImageInfo.modelName) {
            case "controlnet-1.1-x-realistic-vision-v2.0": {
                const output = await runModel("usamaehsan/controlnet-1.1-x-realistic-vision-v2.0:542a2f6729906f610b5a0656b4061b6f792f3044f1b86eca7ce7dee3258f025b",
                    {
                        image: imageToImageInfo.imageLink,
                        prompt: imageToImageInfo.prompt,
                        n_prompt: imageToImageInfo.negative_prompt,
                        image_resolution: parseInt(imageToImageInfo.image_resolution),
                        preprocessor_resolution: parseInt(imageToImageInfo.preprocessor_resolution),
                        ddim_steps: parseInt(imageToImageInfo.ddim_steps),
                        strength: Number(imageToImageInfo.strength),
                    });
                if (Array.isArray(output)) {
                    if (output.length === 2) {
                        const { saveNewGeneratedImage } = require("./generatedImages.controller");
                        const result = await saveNewGeneratedImage(output[1]);
                        if (result.msg && result.msg === "success file downloaded !!") {
                            generatedImagePathInServer = result.imagePath;
                            generatedImageAsArrayBuffer = result.imageAsArrayBuffer;
                            await res.json(result.imagePath);
                        }
                    } else await res.status(500).json(err);
                }
                break;
            }
            default: {
                await res.status(400).json("Invalid Model Name !!");
            }
        }
    } catch (err) {
        await res.status(500).json(err);
    }
    if (generatedImagePathInServer) await saveNewGeneratedImageDataGlobalFunc({ ...imageToImageInfo, generatedImageURL: generatedImagePathInServer }, generatedImageAsArrayBuffer);
}

async function addNewCategory(req, res) {
    try{
        const bodyData = req.body;
        const categoryInfo = {
            ...Object.assign({}, bodyData),
            ...Object.assign({}, req.files),
        };
        const { addNewCategory } = require("../models/imageToImageCategories.model");
        const result = await addNewCategory(categoryInfo);
        await res.json(result);
    }
    catch(err) {
        const { unlinkSync } = require("fs");
        unlinkSync(req.files["categoryImgFile"][0].path);
        unlinkSync(req.files["styleImgFile"][0].path);
        await res.status(500).json(err);
    }
}

async function addNewStyle(req, res) {
    try{
        const bodyData = req.body;
        const styleData = {
            ...Object.assign({}, bodyData),
            imgSrc: req.file.path,
        };
        const { addNewStyle } = require("../models/imageToImageStyles.model");
        const result = await addNewStyle(styleData);
        await res.json(result);
    }
    catch(err) {
        const { unlinkSync } = require("fs");
        unlinkSync(req.file.path);
        await res.status(500).json(err);
    }
}

async function putCategoryData(req, res) {
    try{
        const categoryId = req.params.categoryId;
        const newCategorySortNumber = req.body.newCategorySortNumber;
        const newCategoryName = req.body.newCategoryName;
        if (!newCategorySortNumber || !categoryId || !newCategoryName) {
            await res.status(400).json("Sorry, Please Send Category Id, New Category Sort Number And Old Category Name And New Category Name !!");
        } else {
            const { updateCategoryData } = require("../models/imageToImageCategories.model");
            const result = await updateCategoryData(categoryId, newCategorySortNumber, newCategoryName);
            await res.json(result);
        }
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function putStyleData(req, res) {
    try{
        const styleId = req.params.styleId;
        const categoryName = req.query.categoryName;
        const newCategoryStyleSortNumber = req.body.newCategoryStyleSortNumber,
            newName = req.body.newName,
            newPrompt = req.body.newPrompt,
            newNegativePrompt = req.body.newNegativePrompt,
            newDdimSteps = req.body.newDdimSteps,
            newStrength = req.body.newStrength;
        if (!styleId || !categoryName || !newCategoryStyleSortNumber || !newName || !newPrompt || !newNegativePrompt || !newDdimSteps || !newStrength) {
            await res.status(400).json("Sorry, Please Send All Requirments Field !!");
        } else {
            const { updateStyleData } = require("../models/imageToImageStyles.model");
            const result = await updateStyleData(styleId, categoryName, newCategoryStyleSortNumber, newName, newPrompt, newNegativePrompt, newDdimSteps, newStrength);
            await res.json(result);
        }
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function deleteCategoryData(req, res) {
    try{
        const categoryId = req.params.categoryId;
        if (!categoryId) await res.status(400).json("Sorry, Please Send Category Id");
        else {
            const { deleteCategoryData } = require("../models/imageToImageCategories.model");
            const result = await deleteCategoryData(categoryId);
            if (result !== "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!") {
                const { unlinkSync } = require("fs");
                unlinkSync(result.categoryData.imgSrc);
                for (let i = 0; i < result.categoryStylesData.length; i++) {
                    unlinkSync(result.categoryStylesData[i].imgSrc);
                }
                await res.json("Category Deleting Process Is Succesfuly !!");
            }
        }
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function deleteStyleData(req, res) {
    try{
        const styleId = req.params.styleId;
        const categoryName = req.query.categoryName;
        if (!styleId || !categoryName) res.status(400).json("Sorry, Please Send Style Id And Category Name !!");
        else {
            const { deleteStyleData } = require("../models/imageToImageStyles.model");
            const result = await deleteStyleData(styleId, categoryName);
            if (result) {
                const { unlinkSync } = require("fs");
                unlinkSync(result);
                await res.json("Category Style Deleting Process Is Succesfuly !!");
            }
        }
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

module.exports = {
    getAllCategoriesData,
    get_all_category_Styles_Data,
    uploadImageAndProcessing,
    generateImage,
    addNewCategory,
    addNewStyle,
    putCategoryData,
    putStyleData,
    deleteCategoryData,
    deleteStyleData,
}