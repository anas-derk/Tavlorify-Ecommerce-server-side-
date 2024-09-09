const { getResponseObject, saveNewGeneratedImage, saveNewGeneratedImageDataGlobalFunc } = require("../global/functions");

const generatedImagesManagmentFunctions = require("../models/generatedImages.model");

const sharp = require("sharp");

const Replicate = require("replicate");

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

const { Translate } = require("@google-cloud/translate").v2;

async function runModel(model, input) {
    try {
        const output = await replicate.run(
            model, { input, },
        );
        return output;
    } catch (err) {
        throw Error(err);
    }
}

async function translateText(text){
    const credentials = JSON.parse(process.env.GOOGLE_CLOUD_TRANSLATE_API_CREDENTIALS);
    const translate = new Translate({
        credentials: credentials,
        projectId: credentials.projectId
    });
    let [ result ] = await translate.detect(text);
    const [ translation ] = await translate.translate(text, { to: "en" });
    return translation;
}

async function generateImageUsingTextToImageService(req, res) {
    let generatedImagePathInServer = "", generatedImageAsArrayBuffer;
    const { textPrompt, model_name, categoryName, prompt, negative_prompt, width, height, num_inference_steps, expert_ensemble_refiner } = req.query;
    try{
        const textAfterTranslation = await translateText(textPrompt);
        let tempOutput;
        switch (model_name) {
            case "dreamshaper": {
                const output = await runModel("cjwbw/dreamshaper:ed6d8bee9a278b0d7125872bddfb9dd3fc4c401426ad634d8246a660e387475b",
                {
                    prompt: `${textAfterTranslation}, ${categoryName}, ${prompt}`,
                    negative_prompt: negative_prompt,
                    width: parseInt(Number(width)),
                    height: parseInt(Number(height)),
                });
                tempOutput = output;
                break;
            }
            case "stable-diffusion": {
                const output = await runModel("stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
                {
                    prompt: `${textAfterTranslation}, ${categoryName}, ${prompt}`,
                    negative_prompt: negative_prompt,
                    width: parseInt(Number(width)),
                    height: parseInt(Number(height)),
                });
                tempOutput = output;
                break;
            }
            case "midjourney-diffusion": {
                const output = await runModel("tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
                {
                    prompt: `${textAfterTranslation}, ${categoryName}, ${prompt}`,
                    negative_prompt: negative_prompt,
                    width: parseInt(Number(width)),
                    height: parseInt(Number(height)),
                });
                tempOutput = output;
                break;
            }
            case "deliberate-v2": {
                const output = await runModel("mcai/deliberate-v2:8e6663822bbbc982648e3c34214cf42d29fe421b2620cc33d8bda767fc57fe5a",
                {
                    prompt: `${textAfterTranslation}, ${categoryName}, ${prompt}`,
                    negative_prompt: negative_prompt,
                    width: parseInt(Number(width)),
                    height: parseInt(Number(height)),
                });
                tempOutput = output;
                break;
            }
            case "sdxl": {
                const output = await runModel("stability-ai/sdxl:2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2", 
                {
                    prompt: `${textAfterTranslation}, ${categoryName}, ${prompt}`,
                    negative_prompt: negative_prompt,
                    width: parseInt(Number(width)),
                    height: parseInt(Number(height)),
                    num_inference_steps,
                    refine: expert_ensemble_refiner,
                    width: parseInt(Number(width)),
                    height: parseInt(Number(height)),
                });
                tempOutput = output;
                break;
            }
            case "sdxl-lightning-4step": {
                const output = await runModel("bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
                {
                    prompt: `${textAfterTranslation}, ${categoryName}, ${prompt}`,
                    width: parseInt(Number(width)),
                    height: parseInt(Number(height)),
                });
                tempOutput = output;
                break;
            }
            default: {
                res.status(400).json("Invalid Model Name !!");
            }
        }
        if (tempOutput && Array.isArray(tempOutput)) {
            if (tempOutput.length === 1) {
                const result = await saveNewGeneratedImage(tempOutput[0]);
                if (!result.error) {
                    generatedImagePathInServer = result.data.imagePath;
                    generatedImageAsArrayBuffer = result.data.imageAsArrayBuffer;
                    res.json({
                        msg: "Generating Image From Text Process Has Been Successfully !!",
                        error: false,
                        data: result.data.imagePath,
                    });
                }
            } else {
                res.status(500).json(getResponseObject("Error In Generating", true, {}));
            }
        }
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
    if (generatedImagePathInServer) {
        await saveNewGeneratedImageDataGlobalFunc({ service: "text-to-image", textPrompt, categoryName, styleName, paintingType, position, dimentionsInCm, isExistWhiteBorder, frameColor, generatedImageURL: generatedImagePathInServer }, generatedImageAsArrayBuffer);
    }
}

async function generateImageUsingImageToImageService(req, res) {
    let generatedImagePathInServer = "", generatedImageAsArrayBuffer;
    const { modelName, imageLink, prompt, negative_prompt, image_resolution, preprocessor_resolution, ddim_steps, strength } = req.query;
    try {
        switch (modelName) {
            case "controlnet-1.1-x-realistic-vision-v2.0": {
                const output = await runModel("usamaehsan/controlnet-1.1-x-realistic-vision-v2.0:542a2f6729906f610b5a0656b4061b6f792f3044f1b86eca7ce7dee3258f025b",
                    {
                        image: imageLink,
                        prompt: prompt,
                        n_prompt: negative_prompt,
                        image_resolution: parseInt(image_resolution),
                        preprocessor_resolution: parseInt(preprocessor_resolution),
                        ddim_steps: parseInt(ddim_steps),
                        strength: Number(strength),
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
                res.status(400).json(getResponseObject("Invalid Model Name !!", true, {}));
            }
        }
    } catch (err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
    if (generatedImagePathInServer) {
        await saveNewGeneratedImageDataGlobalFunc({ service: "image-to-image", imageLink, categoryName, styleName, paintingType, isExistWhiteBorder, frameColor, generatedImageURL: generatedImagePathInServer }, generatedImageAsArrayBuffer);
    }
}

async function generateImageUsingFaceSwapService(req, res) {
    const { imageLink, styleImageLink } = req.query;
    try {
        const output = await runModel("yan-ops/face_swap:d5900f9ebed33e7ae08a07f17e0d98b4ebc68ab9528a70462afc3899cfe23bab",
            {
                local_source: imageLink,
                local_target: styleImageLink,
            }
        );
        if (output.status === "succeed") {
            const result = await saveNewGeneratedImage(output.image);
            if (!result.error) {
                res.json({
                    msg: "Generating Image From Image For Face Swap Service Process Has Been Successfully !!",
                    error: false,
                    data: result.data.imagePath,
                });
                return;
            }
        }
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    } catch (err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function uploadImageAndProcessing(req, res) {
    const filePath = `assets/images/uploadedImages/image${Date.now()}_${Math.random()}.jpg`;
    try {
        await sharp(req.file.buffer, { failOn: "error" }).withMetadata().rotate().toFile(filePath);
        res.json({
            msg: "Uploading Image Process Has Been Successfully !!",
            error: false,
            data: filePath,
        });
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getGeneratedImagesCount(req, res) {
    try{
        await res.json(await generatedImagesManagmentFunctions.getGeneratedImagesCount(req.query));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getAllGeneratedImagesDataInsideThePage(req, res) {
    try{
        const { pageNumber, pageSize, service } = req.query;
        res.json(await generatedImagesManagmentFunctions.getAllGeneratedImagesDataInsideThePage(pageNumber, pageSize, service));
    }
    catch(err){
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function postNewGeneratedImageData(req, res) {
    try{
        const generatedImageData = req.body;
        const result = await saveNewGeneratedImage(generatedImageData.generatedImageURL);
        if (!result.error) {
            const result1 = await generatedImagesManagmentFunctions.saveNewGeneratedImageData({
                ...generatedImageData,
                generatedImageURL: result.data.imagePath,
            });
            res.json(result1);
        }
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function postImageAfterCroping(req, res) {
    try {
        const cropingDetails = req.body;
        const imagePath = `assets/images/cropedImages/cropedImage${Math.random()}_${Date.now()}__.png`;
        const imageBuffer = sharp(cropingDetails.imagePath);
        const { width, height } = await imageBuffer.metadata();
        if (width < height) {
            await imageBuffer.resize({ fit: "cover", width: cropingDetails.width, height: null })
                .extract({ width: cropingDetails.width, height: cropingDetails.height, left: cropingDetails.left, top: cropingDetails.top })
                .toFile(imagePath);
        } else if (width > height) {
            await imageBuffer.resize({ fit: "cover", width: null, height: cropingDetails.height })
                .extract({ width: cropingDetails.width, height: cropingDetails.height, left: cropingDetails.left, top: cropingDetails.top })
                .toFile(imagePath);
        }
        await res.json(imagePath);
    }
    catch (err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteGeneratedImageData(req, res) {
    try{
        await res.json(await generatedImagesManagmentFunctions.deleteGeneratedImageData(req.params.generatedImageDataId));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

module.exports = {
    generateImageUsingTextToImageService,
    generateImageUsingImageToImageService,
    generateImageUsingFaceSwapService,
    uploadImageAndProcessing,
    getGeneratedImagesCount,
    getAllGeneratedImagesDataInsideThePage,
    postNewGeneratedImageData,
    postImageAfterCroping,
    deleteGeneratedImageData,
}