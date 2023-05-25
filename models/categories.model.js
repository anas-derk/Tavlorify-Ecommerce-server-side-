// Import Mongoose

const mongoose = require("mongoose");

// Create User Schema

const categorySchema = mongoose.Schema({
    imgSrc: String,
    name: String,
    styles: Array,
});

// Create Category Model From User Schema

const categoryModel = mongoose.model("categorie", categorySchema);

// Import Database URL

const DB_URL = require("../global/DB_URL");

async function getAllCategoriesData() {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let categorieData = await categoryModel.find({});
        if (categorieData) {
            await mongoose.disconnect();
            return categorieData;
        }
        else {
            mongoose.disconnect();
            return "Sorry, There Is No Categories Data Now !!";
        }
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function getCategoryData(categoryName) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let categoryData = await categoryModel.findOne({ name: categoryName });
        if (categoryData) {
            await mongoose.disconnect();
            return categoryData;
        }
        else {
            mongoose.disconnect();
            return "Sorry, The Category Is Not Exist !!, Please Enter Another Category Name ..";
        }
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function updateStyleData(styleId, prompt, negative_prompt) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let categoryData = await categoryModel.updateOne({
            
        }, {});
        if (categoryData) {
            await mongoose.disconnect();
            return categoryData;
        }
        else {
            mongoose.disconnect();
            return "Sorry, The Category Is Not Exist !!, Please Enter Another Category Name ..";
        }
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

module.exports = {
    getCategoryData,
    updateStyleData,
    getAllCategoriesData,
};