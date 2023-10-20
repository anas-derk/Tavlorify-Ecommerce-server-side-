async function getAllCategoriesData(req, res) {
    const { getAllCategoriesData } = require("../models/imageToImageCategories.model");
    try{
        const result = await getAllCategoriesData();
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function get_all_category_Styles_Data(req, res) {
    const categoryName = req.query.categoryName;
    const { get_all_category_Styles_Data } = require("../models/imageToImageStyles.model");
    try{
        const result = await get_all_category_Styles_Data(categoryName);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function uploadImageAndProcessing(req, res) {
    const filePath = `assets/images/uploadedImages/image${Date.now()}_${Math.random()}.jpg`;
    const sharp = require("sharp");
    try {
        const { width, height } = await sharp(req.file.buffer).withMetadata().rotate().toFile(filePath);
        let imageType;
        if (width > height) imageType = "horizontal";
        else if (width < height) imageType = "vertical";
        else imageType = "square";
        await res.json({
            imageLink: `https://newapi.tavlorify.se/${filePath}`,
            imageType: imageType,
        });
    }
    catch(err) {
        const { unlinkSync } = require("fs");
        unlinkSync(filePath);
        await res.status(500).json(err);
    }
}

async function runModel(model, input) {
    const Replicate = require("replicate");
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });
    try {
        const output = await replicate.run(
            model, { input, },
        );
        return output;
    } catch (err) {
        throw Error(err);
    }
}

async function generateImage(req, res) {
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
                await res.json(output);
                break;
            }
            default: {
                await res.status(400).json("Invalid Model Name !!");
            }
        }
    } catch (err) {
        await res.status(500).json(err);
    }
}

async function addNewCategory(req, res) {
    const bodyData = req.body;
    const categoryInfo = {
        ...Object.assign({}, bodyData),
        ...Object.assign({}, req.files),
    };
    const { addNewCategory } = require("../models/imageToImageCategories.model");
    try{
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
    const bodyData = req.body;
    const styleData = {
        ...Object.assign({}, bodyData),
        imgSrc: req.file.path,
    };
    const { addNewStyle } = require("../models/imageToImageStyles.model");
    try{
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
    const categoryId = req.params.categoryId;
    const newCategorySortNumber = req.body.newCategorySortNumber;
    const newCategoryName = req.body.newCategoryName;
    try{
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
    const styleId = req.params.styleId;
    const categoryName = req.query.categoryName;
    const newCategoryStyleSortNumber = req.body.newCategoryStyleSortNumber,
        newName = req.body.newName,
        newPrompt = req.body.newPrompt,
        newNegativePrompt = req.body.newNegativePrompt,
        newDdimSteps = req.body.newDdimSteps,
        newStrength = req.body.newStrength;
    try{
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
    const categoryId = req.params.categoryId;
    try{
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
    const styleId = req.params.styleId;
    const categoryName = req.query.categoryName;
    try{
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