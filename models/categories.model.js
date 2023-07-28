// Import Mongoose And Category Model Object

const { mongoose, categoryModel } = require("../models/all.models");

// Import Database URL

const DB_URL = require("../global/DB_URL");

async function addNewCategory(categoryName) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        const category = await categoryModel.findOne({ name: categoryName });
        if (category) {
            await mongoose.disconnect();
            return "Sorry, This Category Has Already Been Added !!"
        }
        else {
            const newCategory = new categoryModel({
                name: categoryName,
            });
            await newCategory.save();
            mongoose.disconnect();
            return "Congratulations, the category has been successfully added";
        }
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

module.exports = {
    addNewCategory,
}