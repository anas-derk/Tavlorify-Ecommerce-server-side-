// Import Mongoose And Image To Image Style Model Object

const { mongoose, imageToImageStyleModel } = require("../models/all.models");

// Import Database URL

const DB_URL = require("../global/DB_URL");

async function get_all_category_Styles_Data(categoryName){
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let categoryStylesData = await imageToImageStyleModel.find({ categoryName }).sort({ sortNumber: 1 });
        if (categoryStylesData) {
            await mongoose.disconnect();
            return categoryStylesData;
        }
        else {
            mongoose.disconnect();
            return "Sorry, There Is No Styles For This Category Data Now !!";
        }
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function addNewStyle(styleData) {
    try {
        await mongoose.connect(DB_URL);
        const newStyleData = new imageToImageStyleModel({
            imgSrc: styleData.imgSrc,
            name: styleData.styleName,
            prompt: styleData.stylePrompt,
            negative_prompt: styleData.styleNegativePrompt,
            ddim_steps: styleData.ddim_steps,
            strength: styleData.strength,
            modelName: styleData.modelName,
            categoryName: styleData.categoryName,
        });
        await newStyleData.save();
        await mongoose.disconnect();
        return "Adding New Category Style For Image To Image Page Process Is Succesfuly !!";
    }
    catch (err) {
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function updateStyleData(styleId, newCategoryStyleSortNumber, newName, newPrompt, newNegativePrompt, newDdimSteps, newStrength){
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let newStyleData = await imageToImageStyleModel.updateOne({
            _id: styleId,
        }, {
            sortNumber: newCategoryStyleSortNumber,
            name: newName,
            prompt: newPrompt,
            negative_prompt: newNegativePrompt,
            ddim_steps: newDdimSteps,
            strength: newStrength,
        });
        if (newStyleData) {
            await mongoose.disconnect();
            return newStyleData;
        }
        else {
            mongoose.disconnect();
            return "Sorry, The Category Style Is Not Exist !!, Please Enter Another ..";
        }
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function deleteStyleData(styleId) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        const result = await imageToImageStyleModel.deleteOne({
            _id: styleId,
        });
        await mongoose.disconnect();
        if (result.deletedCount === 0) return "Sorry, This Style Is Not Exist, Please Send Valid Style Id !!";
        return "Category Style Deleting Process Is Succesfuly !!";
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

module.exports = {
    get_all_category_Styles_Data,
    addNewStyle,
    updateStyleData,
    deleteStyleData,
}