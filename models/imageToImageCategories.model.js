// Import Mongoose And Image To Image Category Model Object

const { mongoose, imageToImageCategoryModel, imageToImageStyleModel } = require("../models/all.models");

// Import Database URL

const DB_URL = require("../global/DB_URL");

async function getAllCategoriesData() {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let categorieData = await imageToImageCategoryModel.find({});
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
        let categoryData = await imageToImageCategoryModel.findOne({ name: categoryName });
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

async function addNewCategory(categoryInfo) {
    try {
        await mongoose.connect(DB_URL);
        const newCategory = new imageToImageCategoryModel({
            imgSrc: categoryInfo["categoryImgFile"][0].path,
            name: categoryInfo.categoryName,
        });
        await newCategory.save();
        const newStyle = new imageToImageStyleModel({
            imgSrc: categoryInfo["styleImgFile"][0].path,
            name: categoryInfo.styleName,
            prompt: categoryInfo.stylePrompt,
            negative_prompt: categoryInfo.styleNegativePrompt,
            ddim_steps: categoryInfo.ddim_steps,
            strength: categoryInfo.strength,
            modelName: categoryInfo.modelName,
            categoryName: categoryInfo.categoryName,
        });
        await newStyle.save();
        await mongoose.disconnect();
        return "Add New Category And First Style For Image To Image Page Is Successfuly !!";
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function updateStyleData(categoryName, styleName, newPrompt, newNegativePrompt) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let categoryData = await imageToImageCategoryModel.updateOne({
            name: categoryName,
        }, {
            
        });
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
    getAllCategoriesData,
    getCategoryData,
    addNewCategory,
    updateStyleData,
};