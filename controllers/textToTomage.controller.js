function getAllCategoriesData(req, res) {
    const { getAllCategoriesData } = require("../models/textToImageCategories.model");
    getAllCategoriesData()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

function addNewCategory(req, res) {
    const bodyData = req.body;
    const categoryInfo = {
        ...Object.assign({}, bodyData),
        ...Object.assign({}, req.files),
    };
    const { addNewCategory } = require("../models/textToImageCategories.model");
    addNewCategory(categoryInfo).then((result) => {
        res.json(result);
    })
    .catch(err => {
        console.log(err);
        const { unlinkSync } = require("fs");
        unlinkSync(req.files["categoryImgFile"][0].path);
        unlinkSync(req.files["styleImgFile"][0].path);
        res.json(err);
    });
}

function get_all_category_Styles_Data(req, res) {
    let categoryName = req.query.categoryName;
    const { get_all_category_Styles_Data } = require("../models/textToImageStyles.model");
    get_all_category_Styles_Data(categoryName)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

function addNewStyle(req, res) {
    const bodyData = req.body;
    const styleData = {
        ...Object.assign({}, bodyData),
        imgSrc: req.file.path,
    };
    const { addNewStyle } = require("../models/textToImageStyles.model");
    addNewStyle(styleData).then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.log(err);
        const { unlinkSync } = require("fs");
        unlinkSync(req.file.path);
        res.json(err);
    });
}

function putStyleData(req, res) {
    let styleId = req.params.styleId;
    let newPrompt = req.body.newPrompt,
        newNegativePrompt = req.body.newNegativePrompt;
    const { updateStyleData } = require("../models/textToImageStyles.model");
    updateStyleData(styleId, newPrompt, newNegativePrompt)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

function putCategoryData(req, res) {
    const categoryId = req.params.categoryId;
    const oldCategoryName = req.query.oldCategoryName;
    const newCategoryName = req.body.newCategoryName;
    console.log(categoryId, oldCategoryName, newCategoryName);
    if (!categoryId || !oldCategoryName || !newCategoryName) return "Sorry, Please Send Category Id And Old Category Name And New Category Name !!";
    const { updateCategoryData } = require("../models/textToImageCategories.model");
    updateCategoryData(categoryId, oldCategoryName, newCategoryName)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

function deleteStyleData(req, res) {
    const styleId = req.params.styleId;
    if (!styleId) return "Sorry, Please Send Style Id"; 
    const { deleteStyleData } = require("../models/textToImageStyles.model");
    deleteStyleData(styleId)
        .then((result) => {
            if (result === "Category Style Deleting Process Is Succesfuly !!") {
                const { unlinkSync } = require("fs");
                unlinkSync(req.query.imgSrc);
                res.json(result);
            }
        })
        .catch((err) => res.status(500).json(err));
}

async function runModel(model, input) {
    const Replicate = require("replicate");
    const replicate = new Replicate({
        auth: process.env.API_TOKEN,
    });
    try {
        const output = await replicate.run(
            model, { input, },
        );
        return output;
    } catch (err) {
        return err;
    }
}

function generateImage(req, res) {
    let textPrompt = req.query.textPrompt,
        prompt = req.query.prompt,
        category = req.query.category,
        model_name = req.query.model_name,
        negative_prompt = req.query.negative_prompt,
        width = req.query.width,
        height = req.query.height;

    switch (model_name) {
        case "dreamshaper": {
            runModel("cjwbw/dreamshaper:ed6d8bee9a278b0d7125872bddfb9dd3fc4c401426ad634d8246a660e387475b",
                {
                    prompt: `${textPrompt}, ${category}, ${prompt}`,
                    negative_prompt,
                    width: parseInt(width),
                    height: parseInt(height),
                })
                .then((output) => {
                    res.json(output);
                })
                .catch((err) => {
                    res.json(err);
                });
            break;
        }
        case "stable-diffusion": {
            runModel("stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
                {
                    prompt: `${textPrompt}, ${category}, ${prompt}`,
                    negative_prompt,
                    width: parseInt(width),
                    height: parseInt(height),
                })
                .then((output) => {
                    res.json(output);
                })
                .catch((err) => {
                    res.json(err);
                });
            break;
        }
        case "midjourney-diffusion": {
            runModel("tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
                {
                    prompt: `${textPrompt}, ${category}, ${prompt}`,
                    negative_prompt,
                    width: parseInt(width),
                    height: parseInt(height),
                })
                .then((output) => {
                    res.json(output);
                })
                .catch((err) => {
                    res.json(err);
                });
            break;
        }
        case "deliberate-v2": {
            runModel("mcai/deliberate-v2:8e6663822bbbc982648e3c34214cf42d29fe421b2620cc33d8bda767fc57fe5a",
                {
                    prompt: `${textPrompt}, ${category}, ${prompt}`,
                    negative_prompt,
                    width: parseInt(width),
                    height: parseInt(height),
                })
                .then((output) => {
                    res.json(output);
                })
                .catch((err) => {
                    res.json(err);
                });
            break;
        }
        case "kandinsky-2": {
            runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f", 
                {
                    prompt: `${textPrompt}, ${category}, ${prompt}`,
                    width: parseInt(width),
                    height: parseInt(height),
                })
                .then((output) => {
                    res.json(output);
                })
                .catch((err) => {
                    res.json(err);
                });
            break;
        }
        case "openjourney": {
            runModel("prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",
                {
                    prompt: `${textPrompt}, ${category}, ${prompt}`,
                    width: parseInt(width),
                    height: parseInt(height),
                })
                .then((output) => {
                    res.json(output);
                })
                .catch((err) => {
                    res.json(err);
                });
            break;
        }
        default: {
            req.json("Error !!");
        }
    }
}

module.exports = {
    getAllCategoriesData,
    get_all_category_Styles_Data,
    putStyleData,
    putCategoryData,
    deleteStyleData,
    generateImage,
    addNewCategory,
    addNewStyle,
}