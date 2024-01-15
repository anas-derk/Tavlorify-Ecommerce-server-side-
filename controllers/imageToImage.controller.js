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
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { get_all_category_Styles_Data } = require("../models/imageToImageStyles.model");
        const result = await get_all_category_Styles_Data(categoryName);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function uploadImageAndProcessing(req, res) {
    const filePath = `assets/images/uploadedImages/image${Date.now()}_${Math.random()}.jpg`;
    try {
        const sharp = require("sharp");
        await sharp(req.file.buffer, { failOn: "error" }).withMetadata().rotate().toFile(filePath);
        await res.json(filePath);
    }
    catch(err) {
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

async function generateImage(req, res) {
    let generatedImagePathInServer = "", generatedImageAsArrayBuffer;
    const imageToImageInfo = req.query;
    const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
    const checkResult = checkIsExistValueForFieldsAndDataTypes([
        { fieldName: "Image Link", fieldValue: imageToImageInfo.imageLink, dataType: "string", isRequiredValue: true },
        { fieldName: "Prompt", fieldValue: prompt, dataType: "string", isRequiredValue: true },
        { fieldName: "Negative Prompt", fieldValue:imageToImageInfo.negative_prompt, dataType: "string", isRequiredValue: true },
        { fieldName: "Image Resolution", fieldValue: Number(imageToImageInfo.image_resolution), dataType: "number", isRequiredValue: false },
        { fieldName: "Preprocessor Resolution", fieldValue: Number(imageToImageInfo.preprocessor_resolution), dataType: "number", isRequiredValue: true },
        { fieldName: "Ddim Steps", fieldValue: Number(imageToImageInfo.ddim_steps), dataType: "number", isRequiredValue: true },
        { fieldName: "Strength", fieldValue: Number(imageToImageInfo.strength), dataType: "number", isRequiredValue: true },
    ]);
    if (checkResult) {
        await res.status(400).json(checkResult);
        return;
    }
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
                        const { saveNewGeneratedImage } = require("../global/functions");
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
        console.log(err);
        await res.status(500).json(err);
    }
    if (generatedImagePathInServer) {
        const { saveNewGeneratedImageDataGlobalFunc } = require("../global/functions");
        await saveNewGeneratedImageDataGlobalFunc({ ...imageToImageInfo, generatedImageURL: generatedImagePathInServer }, generatedImageAsArrayBuffer);
    }
}

async function addNewCategory(req, res) {
    try{
        const bodyData = req.body;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: bodyData.categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: bodyData.styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Prompt", fieldValue: bodyData.stylePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Negative Prompt", fieldValue: bodyData.styleNegativePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Ddim Steps", fieldValue: Number(bodyData.ddim_steps), dataType: "number", isRequiredValue: true },
            { fieldName: "Strength", fieldValue: Number(bodyData.strength), dataType: "number", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
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
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: bodyData.categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: bodyData.styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Prompt", fieldValue: bodyData.stylePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Negative Prompt", fieldValue: bodyData.styleNegativePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Ddim Steps", fieldValue: Number(bodyData.ddim_steps), dataType: "number", isRequiredValue: true },
            { fieldName: "Strength", fieldValue: Number(bodyData.strength), dataType: "number", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
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
        const bodyData = req.body;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Id", fieldValue: categoryId, dataType: "string", isRequiredValue: true },
            { fieldName: "New Category Sort Number", fieldValue: Number(bodyData.newCategorySortNumber), dataType: "number", isRequiredValue: true },
            { fieldName: "New Category Name", fieldValue: bodyData.newCategoryName, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { updateCategoryData } = require("../models/imageToImageCategories.model");
        const result = await updateCategoryData(categoryId, bodyData);
        await res.json(result);
    }
    catch(err) {
        console.log(err)
        await res.status(500).json(err);
    }
}

async function putStyleData(req, res) {
    try{
        const styleId = req.params.styleId;
        const categoryName = req.query.categoryName;
        const bodyData = req.body;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Style Id", fieldValue: styleId, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "New Category Style Sort Number", fieldValue: Number(bodyData.newCategoryStyleSortNumber), dataType: "number", isRequiredValue: false },
            { fieldName: "New Name", fieldValue: bodyData.newName, dataType: "string", isRequiredValue: false },
            { fieldName: "New Prompt", fieldValue: bodyData.newPrompt, dataType: "string", isRequiredValue: false },
            { fieldName: "New Negative Prompt", fieldValue: bodyData.newNegativePrompt, dataType: "string", isRequiredValue: false },
            { fieldName: "New Ddim Steps", fieldValue: Number(bodyData.newDdimSteps), dataType: "number", isRequiredValue: false },
            { fieldName: "New Strength", fieldValue: Number(bodyData.newStrength), dataType: "number", isRequiredValue: false },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        } 
        const { updateStyleData } = require("../models/imageToImageStyles.model");
        const result = await updateStyleData(styleId, categoryName, bodyData);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function deleteCategoryData(req, res) {
    try{
        const categoryId = req.params.categoryId;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Id", fieldValue: categoryId, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
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
    catch(err) {
        await res.status(500).json(err);
    }
}

async function deleteStyleData(req, res) {
    try{
        const styleId = req.params.styleId;
        const categoryName = req.query.categoryName;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Style Id", fieldValue: styleId, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { deleteStyleData } = require("../models/imageToImageStyles.model");
        const result = await deleteStyleData(styleId, categoryName);
        if (result) {
            const { unlinkSync } = require("fs");
            unlinkSync(result);
            await res.json("Category Style Deleting Process Is Succesfuly !!");
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