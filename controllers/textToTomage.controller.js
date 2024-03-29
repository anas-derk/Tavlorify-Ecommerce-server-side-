const { getResponseObject, checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");

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

async function translateText(text){
    const { Translate } = require("@google-cloud/translate").v2;
    const credentials = JSON.parse(process.env.GOOGLE_CLOUD_TRANSLATE_API_CREDENTIALS);
    const translate = new Translate({
        credentials: credentials,
        projectId: credentials.projectId
    });
    let [ result ] = await translate.detect(text);
    const [ translation ] = await translate.translate(text, { to: "en" });
    return translation;
}

async function generateImage(req, res) {
    let generatedImagePathInServer = "", generatedImageAsArrayBuffer;
    try{
        const textPrompt = req.query.textPrompt,
        prompt = req.query.prompt,
        category = req.query.category,
        model_name = req.query.model_name,
        negative_prompt = req.query.negative_prompt,
        num_inference_steps = req.query.num_inference_steps,
        refine = req.query.expert_ensemble_refiner,
        width = Number(req.query.width),
        height = Number(req.query.height);
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Text Prompt", fieldValue: textPrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Prompt", fieldValue: prompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: category, dataType: "string", isRequiredValue: false },
            { fieldName: "Model Name", fieldValue: model_name, dataType: "string", isRequiredValue: true },
            { fieldName: "Width", fieldValue: width, dataType: "number", isRequiredValue: true },
            { fieldName: "Height", fieldValue: height, dataType: "number", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const textAfterTranslation = await translateText(textPrompt);
        let tempOutput;
        switch (model_name) {
            case "dreamshaper": {
                const output = await runModel("cjwbw/dreamshaper:ed6d8bee9a278b0d7125872bddfb9dd3fc4c401426ad634d8246a660e387475b",
                {
                    prompt: `${textAfterTranslation}, ${category}, ${prompt}`,
                    negative_prompt,
                    width: parseInt(width),
                    height: parseInt(height),
                });
                tempOutput = output;
                break;
            }
            case "stable-diffusion": {
                const output = await runModel("stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
                {
                    prompt: `${textAfterTranslation}, ${category}, ${prompt}`,
                    negative_prompt,
                    width: parseInt(width),
                    height: parseInt(height),
                });
                tempOutput = output;
                break;
            }
            case "midjourney-diffusion": {
                const output = await runModel("tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
                {
                    prompt: `${textAfterTranslation}, ${category}, ${prompt}`,
                    negative_prompt,
                    width: parseInt(width),
                    height: parseInt(height),
                });
                tempOutput = output;
                break;
            }
            case "deliberate-v2": {
                const output = await runModel("mcai/deliberate-v2:8e6663822bbbc982648e3c34214cf42d29fe421b2620cc33d8bda767fc57fe5a",
                {
                    prompt: `${textAfterTranslation}, ${category}, ${prompt}`,
                    negative_prompt,
                    width: parseInt(width),
                    height: parseInt(height),
                });
                tempOutput = output;
                break;
            }
            case "sdxl": {
                const output = await runModel("stability-ai/sdxl:2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2", 
                {
                    prompt: `${textAfterTranslation}, ${category}, ${prompt}`,
                    negative_prompt: negative_prompt,
                    num_inference_steps: num_inference_steps,
                    refine: refine,
                    width: parseInt(width),
                    height: parseInt(height),
                });
                tempOutput = output;
                break;
            }
            case "openjourney": {
                const output = await runModel("prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",
                {
                    prompt: `${textAfterTranslation}, ${category}, ${prompt}`,
                    width: parseInt(width),
                    height: parseInt(height),
                });
                tempOutput = output;
                break;
            }
            default: {
                await res.status(400).json("Invalid Model Name !!");
            }
        }
        if (tempOutput && Array.isArray(tempOutput)) {
            if (tempOutput.length === 1) {
                const { saveNewGeneratedImage } = require("../global/functions");
                const result = await saveNewGeneratedImage(tempOutput[0]);
                if (result.msg && result.msg === "success file downloaded !!") {
                    generatedImagePathInServer = result.imagePath;
                    generatedImageAsArrayBuffer = result.imageAsArrayBuffer;
                    await res.json({
                        msg: "Generating Image Process Has Been Successfully !!",
                        error: false,
                        data: result.imagePath,
                    });
                }
            } else {
                await res.status(500).json(getResponseObject("Error In Generating", true, {}));
            }
        }
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
    if (generatedImagePathInServer) {
        const { saveNewGeneratedImageDataGlobalFunc } = require("../global/functions");
        await saveNewGeneratedImageDataGlobalFunc({ ...req.query, generatedImageURL: generatedImagePathInServer }, generatedImageAsArrayBuffer);
    }
}

async function getAllCategoriesData(req, res) {
    try{
        const { getAllCategoriesData } = require("../models/textToImageCategories.model");
        await res.json(await getAllCategoriesData());
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function get_all_category_styles_data(req, res) {
    try{
        const categoryName = req.query.categoryName;
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { get_all_category_styles_data } = require("../models/textToImageStyles.model");
        await res.json(await get_all_category_styles_data(categoryName));
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
        const bodyData = req.body;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: bodyData.categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: bodyData.styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Prompt", fieldValue: bodyData.stylePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Negative Prompt", fieldValue: bodyData.styleNegativePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Model Name", fieldValue: bodyData.modelName, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const categoryInfo = {
            ...Object.assign({}, bodyData),
            ...Object.assign({}, req.files),
        };
        const { addNewCategory } = require("../models/textToImageCategories.model");
        await res.json(await addNewCategory(categoryInfo));
    }
    catch(err) {
        const { unlinkSync } = require("fs");
        unlinkSync(req.files["categoryImgFile"][0].path);
        unlinkSync(req.files["styleImgFile"][0].path);
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
        const bodyData = req.body;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: bodyData.categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: bodyData.styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Prompt", fieldValue: bodyData.stylePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Negative Prompt", fieldValue: bodyData.styleNegativePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Model Name", fieldValue: bodyData.modelName, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const styleData = {
            ...Object.assign({}, bodyData),
            imgSrc: req.file.path,
        };
        const { addNewStyle } = require("../models/textToImageStyles.model");
        await res.json(await addNewStyle(styleData));
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
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
        const { updateCategoryData } = require("../models/textToImageCategories.model");
        await res.json(await updateCategoryData(categoryId, bodyData));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
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
            { fieldName: "New Model Name", fieldValue: bodyData.newModelName, dataType: "string", isRequiredValue: false },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        } 
        const { updateStyleData } = require("../models/textToImageStyles.model");
        await res.json(await updateStyleData(styleId, categoryName, bodyData));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
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
        const { deleteCategoryData } = require("../models/textToImageCategories.model");
        const result = await deleteCategoryData(categoryId);
        if (!result.error) {
            const { unlinkSync } = require("fs");
            unlinkSync(result.data.categoryData.imgSrc);
            for(let i = 0; i < result.data.categoryStylesData.length; i++) {
                unlinkSync(result.data.categoryStylesData[i].imgSrc);
            }
        }
        await res.json(result);
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
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
        const { deleteStyleData } = require("../models/textToImageStyles.model");
        const result = await deleteStyleData(styleId, categoryName);
        if (!result.error) {
            const { unlinkSync } = require("fs");
            unlinkSync(result.data);
        }
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

module.exports = {
    getAllCategoriesData,
    get_all_category_styles_data,
    generateImage,
    addNewStyle,
    addNewCategory,
    putStyleData,
    putCategoryData,
    deleteStyleData,
    deleteCategoryData,
}