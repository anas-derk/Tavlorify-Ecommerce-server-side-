// Import Mongoose

const mongoose = require("mongoose");

// Create Image To Image Style Schema

const imageToImageStyleSchema = mongoose.Schema({
    imgSrc: String,
    name: String,
    prompt: String,
    negative_prompt: String,
    ddim_steps: Number,
    strength: Number,
    modelName: String,
    categoryName: String,
});

// Create Image To Image Style Model From Style Schema

const imageToImageStyleModel = mongoose.model("image-to-image-style", imageToImageStyleSchema);

// Import Database URL

const DB_URL = require("../global/DB_URL");

async function get_all_category_Styles_Data(categoryName){
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let categoryStylesData = await imageToImageStyleModel.find({ categoryName });
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

async function updateStyleData(styleId, newPrompt, newNegativePrompt){
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let newStyleData = await imageToImageStyleModel.updateOne({
            _id: styleId,
        }, {
            prompt: newPrompt,
            negative_prompt: newNegativePrompt,
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

module.exports = {
    get_all_category_Styles_Data,
    updateStyleData,
}