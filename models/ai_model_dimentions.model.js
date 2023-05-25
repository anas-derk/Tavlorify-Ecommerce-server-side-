// Import Mongoose

const mongoose = require("mongoose");

// Create User Schema

const modelDimentionsSchema = mongoose.Schema({
    imgSrc: String,
    name: String,
    styles: Array,
});

// Create Category Model From User Schema

const modelDimentionsModel = mongoose.model("user", modelDimentionsSchema);

// Import Database URL

const DB_URL = require("../global/DB_URL");

async function getAllModelsDimentions() {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let models_dimentions = await modelDimentionsModel.find({});
        if (models_dimentions) {
            await mongoose.disconnect();
            return models_dimentions;
        }
        else {
            mongoose.disconnect();
            return "Sorry, Not Found Any Model Dimentions";
        }
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

module.exports = { getAllModelsDimentions };