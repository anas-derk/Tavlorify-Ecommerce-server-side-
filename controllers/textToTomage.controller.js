async function getAllCategoriesData(req, res) {
    try{
        const { getAllCategoriesData } = require("../models/textToImageCategories.model");
        const result = await getAllCategoriesData();
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function get_all_category_styles_data(req, res) {
    try{
        const categoryName = req.query.categoryName;
        const { checkIsExistValueForFields } = require("../global/functions");
        let checkResult = checkIsExistValueForFields([{ fieldName: "Category Name", fieldValue: categoryName }]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { checkDataTypeForFields } = require("../global/functions");
        checkResult = checkDataTypeForFields([{ fieldName: "Category Name", fieldValue: categoryName, dataType: "string" }]);
        if (checkResult) {
            await res.status(400).json("Invalid Request, Please Fix Type Of Category Name ( Required: String ) !!");
            return;
        }
        const { get_all_category_styles_data } = require("../models/textToImageStyles.model");
        const result = await get_all_category_styles_data(categoryName);
        await res.json(result);
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
        width = req.query.width,
        height = req.query.height;
        if (!textPrompt || !prompt || !model_name || !negative_prompt || !width || !height) {
            await res.status(400).json("Invalid Request, Please Send All Required Fields !!");
            return;
        }
        const { checkDataTypeForFields } = require("../global/functions");
        const checkResult = checkDataTypeForFields([{ fieldName: "Text Prompt", fieldValue: textPrompt, dataType: "string", }]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        if (typeof textPrompt !== "string") {
            await res.status(400).json("Invalid Request, Please Send Valid Text Prompt Data Type ( String ) !!");
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
                    await res.json(result.imagePath);
                }
            } else {
                await res.status(500).json("Error In Generating");
            }
        }
    }
    catch(err) {
        console.log(err);
        await res.status(500).json(err);
    }
    if (generatedImagePathInServer) {
        const { saveNewGeneratedImageDataGlobalFunc } = require("../global/functions");
        await saveNewGeneratedImageDataGlobalFunc({ ...req.query, generatedImageURL: generatedImagePathInServer }, generatedImageAsArrayBuffer);
    }
}

async function addNewCategory(req, res) {
    try{
        const bodyData = req.body;
        const categoryInfo = {
            ...Object.assign({}, bodyData),
            ...Object.assign({}, req.files),
        };
        const { addNewCategory } = require("../models/textToImageCategories.model");
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
        const { addNewStyle } = require("../models/textToImageStyles.model");
        const result = await addNewStyle(styleData);
        await res.json(result);
    }
    catch(err){
        const { unlinkSync } = require("fs");
        unlinkSync(req.file.path);
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
            newModelName = req.body.newModelName;
        if (!styleId || !categoryName || !newCategoryStyleSortNumber || !newName || !newPrompt || !newNegativePrompt || !newModelName) {
            await res.status(400).json("Sorry, Please Send All Requirments Field !!");
        } else {
            const { updateStyleData } = require("../models/textToImageStyles.model");
            const result = await updateStyleData(styleId, categoryName, newCategoryStyleSortNumber, newName, newPrompt, newNegativePrompt, newModelName);
            await res.json(result);
        }
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function putCategoryData(req, res) {
    try{
        const categoryId = req.params.categoryId;
        const newCategorySortNumber = req.body.newCategorySortNumber;
        const newCategoryName = req.body.newCategoryName;
        if (!newCategorySortNumber || !categoryId || !newCategoryName) {
            await res.status(400).json("Sorry, Please Send Category Id, Old Category Sort Number And New Category Sort Number And Old Category Name And New Category Name !!");
        } else {
            const { updateCategoryData } = require("../models/textToImageCategories.model");
            const result = await updateCategoryData(categoryId, newCategorySortNumber, newCategoryName);
            await res.json(result);
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
        if (!styleId || !categoryName) await res.status(400).json("Sorry, Please Send Style Id And Category Name !!");
        const { deleteStyleData } = require("../models/textToImageStyles.model");
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

async function deleteCategoryData(req, res) {
    try{
        const categoryId = req.params.categoryId;
        if (!categoryId) await res.status(400).json("Sorry, Please Send Category Id"); 
        else {
            const { deleteCategoryData } = require("../models/textToImageCategories.model");
            const result = await deleteCategoryData(categoryId);
            if (result !== "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!") {
                const { unlinkSync } = require("fs");
                unlinkSync(result.categoryData.imgSrc);
                for(let i = 0; i < result.categoryStylesData.length; i++) {
                    unlinkSync(result.categoryStylesData[i].imgSrc);
                }
                await res.json("Category Deleting Process Is Succesfuly !!");
            }
        }
    }
    catch(err){
        await res.status(500).json(err);
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