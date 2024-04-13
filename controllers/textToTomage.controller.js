const { getResponseObject } = require("../global/functions");

const { saveNewGeneratedImage, saveNewGeneratedImageDataGlobalFunc } = require("../global/functions");

const textToImageCategoriesManagmentFunctions = require("../models/textToImageCategories.model");

const textToImageStylesManagmentFunctions = require("../models/textToImageStyles.model");

const Replicate = require("replicate");

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
        const textToImageInfo = req.query;
        const textAfterTranslation = await translateText(textToImageInfo.textPrompt);
        let tempOutput;
        switch (textToImageInfo.model_name) {
            case "dreamshaper": {
                const output = await runModel("cjwbw/dreamshaper:ed6d8bee9a278b0d7125872bddfb9dd3fc4c401426ad634d8246a660e387475b",
                {
                    prompt: `${textAfterTranslation}, ${textToImageInfo.category}, ${textToImageInfo.prompt}`,
                    negative_prompt: textToImageInfo.negative_prompt,
                    width: parseInt(Number(textToImageInfo.width)),
                    height: parseInt(Number(textToImageInfo.height)),
                });
                tempOutput = output;
                break;
            }
            case "stable-diffusion": {
                const output = await runModel("stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
                {
                    prompt: `${textAfterTranslation}, ${textToImageInfo.category}, ${textToImageInfo.prompt}`,
                    negative_prompt: textToImageInfo.negative_prompt,
                    width: parseInt(Number(textToImageInfo.width)),
                    height: parseInt(Number(textToImageInfo.height)),
                });
                tempOutput = output;
                break;
            }
            case "midjourney-diffusion": {
                const output = await runModel("tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
                {
                    prompt: `${textAfterTranslation}, ${textToImageInfo.category}, ${textToImageInfo.prompt}`,
                    negative_prompt: textToImageInfo.negative_prompt,
                    width: parseInt(Number(textToImageInfo.width)),
                    height: parseInt(Number(textToImageInfo.height)),
                });
                tempOutput = output;
                break;
            }
            case "deliberate-v2": {
                const output = await runModel("mcai/deliberate-v2:8e6663822bbbc982648e3c34214cf42d29fe421b2620cc33d8bda767fc57fe5a",
                {
                    prompt: `${textAfterTranslation}, ${textToImageInfo.category}, ${textToImageInfo.prompt}`,
                    negative_prompt: textToImageInfo.negative_prompt,
                    width: parseInt(Number(textToImageInfo.width)),
                    height: parseInt(Number(textToImageInfo.height)),
                });
                tempOutput = output;
                break;
            }
            case "sdxl": {
                const output = await runModel("stability-ai/sdxl:2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2", 
                {
                    prompt: `${textAfterTranslation}, ${textToImageInfo.category}, ${textToImageInfo.prompt}`,
                    negative_prompt: textToImageInfo.negative_prompt,
                    width: parseInt(Number(textToImageInfo.width)),
                    height: parseInt(Number(textToImageInfo.height)),
                    num_inference_steps: textToImageInfo.num_inference_steps,
                    refine: textToImageInfo.expert_ensemble_refiner,
                    width: parseInt(Number(textToImageInfowidth)),
                    height: parseInt(Number(textToImageInfo.height)),
                });
                tempOutput = output;
                break;
            }
            case "openjourney": {
                const output = await runModel("prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",
                {
                    prompt: `${textAfterTranslation}, ${textToImageInfo.category}, ${textToImageInfo.prompt}`,
                    width: parseInt(Number(textToImageInfo.width)),
                    height: parseInt(Number(textToImageInfo.height)),
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
                const result = await saveNewGeneratedImage(tempOutput[0]);
                if (result.msg && result.msg === "success file downloaded !!") {
                    generatedImagePathInServer = result.data.imagePath;
                    generatedImageAsArrayBuffer = result.data.imageAsArrayBuffer;
                    await res.json({
                        msg: "Generating Image Process Has Been Successfully !!",
                        error: false,
                        data: result.data.imagePath,
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
        await saveNewGeneratedImageDataGlobalFunc({ ...req.query, generatedImageURL: generatedImagePathInServer }, generatedImageAsArrayBuffer);
    }
}

async function getAllCategoriesData(req, res) {
    try{
        await res.json(await textToImageCategoriesManagmentFunctions.getAllCategoriesData());
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function get_all_category_styles_data(req, res) {
    try{
        await res.json(await textToImageStylesManagmentFunctions.get_all_category_styles_data(req.query.categoryName));
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
        await res.json(await textToImageCategoriesManagmentFunctions.addNewCategory(categoryInfo));
    }
    catch(err) {
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
        const styleData = {
            ...Object.assign({}, req.body),
            imgSrc: req.file.path,
        };
        await res.json(await textToImageStylesManagmentFunctions.addNewStyle(styleData));
    }
    catch(err){
        console.log(err)
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putCategoryData(req, res) {
    try{
        await res.json(await textToImageCategoriesManagmentFunctions.updateCategoryData(req.params.categoryId, req.body));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putStyleData(req, res) {
    try{
        await res.json(await textToImageStylesManagmentFunctions.updateStyleData(req.params.styleId, req.query.categoryName, req.body));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteCategoryData(req, res) {
    try{
        const result = await textToImageCategoriesManagmentFunctions.deleteCategoryData(req.params.categoryId);
        if (!result.error) {
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
        const result = await textToImageStylesManagmentFunctions.deleteStyleData(req.params.styleId, req.query.categoryName);
        if (!result.error) {
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