const { getResponseObject, saveNewGeneratedImageDataGlobalFunc, saveNewGeneratedImage } = require("../global/functions");

const imageToImageCategoriesManagmentFunctions = require("../models/imageToImageCategories.model");

const imageToImageStylesManagmentFunctions = require("../models/imageToImageStyles.model");

const Replicate = require("replicate");

const sharp = require("sharp");

const { unlinkSync } = require("fs");

async function runModel(model, input) {
    try {
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
                        const result = await saveNewGeneratedImage(output[1]);
                        if (!result.error) {
                            generatedImagePathInServer = result.data.imagePath;
                            generatedImageAsArrayBuffer = result.data.imageAsArrayBuffer;
                            res.json({
                                msg: "Generating Image From Image Process Has Been Successfully !!",
                                error: false,
                                data: result.data.imagePath,
                            });
                        }
                    } else res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
                }
                break;
            }
            default: {
                await res.status(400).json(getResponseObject("Invalid Model Name !!", true, {}));
            }
        }
    } catch (err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
    if (generatedImagePathInServer) {
        await saveNewGeneratedImageDataGlobalFunc({ ...imageToImageInfo, generatedImageURL: generatedImagePathInServer }, generatedImageAsArrayBuffer);
    }
}

async function getAllCategoriesData(req, res) {
    try{
        await res.json(await imageToImageCategoriesManagmentFunctions.getAllCategoriesData());
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function get_all_category_Styles_Data(req, res) {
    try{
        await res.json(await imageToImageStylesManagmentFunctions.get_all_category_Styles_Data(req.query.categoryName));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function uploadImageAndProcessing(req, res) {
    const uploadError = req.uploadError;
    if (uploadError) {
        await res.status(400).json(getResponseObject(uploadError, true, {}));
        return;
    }
    const filePath = `assets/images/uploadedImages/image${Date.now()}_${Math.random()}.jpg`;
    try {
        await sharp(req.file.buffer, { failOn: "error" }).withMetadata().rotate().toFile(filePath);
        await res.json({
            msg: "Uploading Image Process Has Been Successfully !!",
            error: false,
            data: filePath,
        });
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function addNewCategory(req, res) {
    try{
        const uploadError = req.uploadError;
        if (uploadError) {
            await res.status(400).json(getResponseObject(uploadError, true, {}));
            return;
        }
        const categoryInfo = {
            ...Object.assign({}, req.body),
            ...Object.assign({}, req.files),
        };
        await res.json(await imageToImageCategoriesManagmentFunctions.addNewCategory(categoryInfo));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function addNewStyle(req, res) {
    try{
        const uploadError = req.uploadError;
        if (uploadError) {
            await res.status(400).json(getResponseObject(uploadError, true, {}));
            return;
        }
        const styleData = {
            ...Object.assign({}, req.body),
            imgSrc: req.file.path,
        };
        await res.json(await imageToImageStylesManagmentFunctions.addNewStyle(styleData));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putCategoryData(req, res) {
    try{
        await res.json(await imageToImageCategoriesManagmentFunctions.updateCategoryData(req.params.categoryId, req.body));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putStyleData(req, res) {
    try{
        await res.json(await imageToImageStylesManagmentFunctions.updateStyleData(req.params.styleId, req.query.categoryName, req.body));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteCategoryData(req, res) {
    try{
        const result = await imageToImageCategoriesManagmentFunctions.deleteCategoryData(req.params.categoryId);
        if (!result.error) {
            unlinkSync(result.data.categoryData.imgSrc);
            for (let i = 0; i < result.data.categoryStylesData.length; i++) {
                unlinkSync(result.data.categoryStylesData[i].imgSrc);
            }
        }
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteStyleData(req, res) {
    try{
        const result = await imageToImageStylesManagmentFunctions.deleteStyleData(req.params.styleId, req.query.categoryName);
        console.log(result.data);
        if (!result.error) {
            unlinkSync(result.data);
        }
        await res.json(result);
    }
    catch(err) {
        console.log(err);
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
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