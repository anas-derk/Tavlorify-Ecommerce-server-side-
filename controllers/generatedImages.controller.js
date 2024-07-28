const { getResponseObject, saveNewGeneratedImage } = require("../global/functions");

const generatedImagesManagmentFunctions = require("../models/generatedImages.model");

const sharp = require("sharp");

const Replicate = require("replicate");

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

async function generateImageUsingTextToImageService(req, res) {
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
                    width: parseInt(Number(textToImageInfo.width)),
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
        await saveNewGeneratedImageDataGlobalFunc({ ...req.query, generatedImageURL: generatedImagePathInServer }, generatedImageAsArrayBuffer);
    }
}

async function generateImageUsingImageToImageService(req, res) {
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

async function generateImageUsingFaceSwapService(req, res) {
    const faceSwapInfo = req.query;
    try {
        const output = await runModel("yan-ops/face_swap:d5900f9ebed33e7ae08a07f17e0d98b4ebc68ab9528a70462afc3899cfe23bab",
            {
                local_source: faceSwapInfo.imageLink,
                local_target: faceSwapInfo.styleImageLink,
            }
        );
        if (output.status === "succeed") {
            const result = await saveNewGeneratedImage(output.image);
            if (!result.error) {
                await res.json({
                    msg: "Generating Image From Image For Face Swap Service Process Has Been Successfully !!",
                    error: false,
                    data: result.data.imagePath,
                });
                return;
            }
        }
        await res.status(500).json(err);
    } catch (err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getAllGeneratedImagesDataInsideThePage(req, res) {
    try{
        const { pageNumber, pageSize, service } = req.query;
        await res.json(await generatedImagesManagmentFunctions.getAllGeneratedImagesDataInsideThePage(pageNumber, pageSize, service));
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getGeneratedImagesDataCount(req, res) {
    try{
        await res.json(await generatedImagesManagmentFunctions.getGeneratedImagesDataCount(req.query));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
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
            await res.json(result1);
        }
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
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
    getAllGeneratedImagesDataInsideThePage,
    getGeneratedImagesDataCount,
    postNewGeneratedImageData,
    postImageAfterCroping,
    deleteGeneratedImageData,
}