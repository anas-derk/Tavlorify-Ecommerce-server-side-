// Import Mongoose And Text To Image Category Model Object

const { mongoose, textToImageCategoryModel, textToImageStyleModel } = require("../models/all.models");

// Import Database URL

const DB_URL = require("../global/DB_URL");

async function getAllCategoriesData() {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let categorieData = await textToImageCategoryModel.find({});
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

async function addNewCategory(categoryInfo) {
    try {
        await mongoose.connect(DB_URL);
        const newCategory = new textToImageCategoryModel({
            imgSrc: categoryInfo["categoryImgFile"][0].path,
            name: categoryInfo.categoryName,
        });
        await newCategory.save();
        const newStyle = new textToImageStyleModel({
            imgSrc: categoryInfo["styleImgFile"][0].path,
            name: categoryInfo.styleName,
            prompt: categoryInfo.stylePrompt,
            negative_prompt: categoryInfo.styleNegativePrompt,
            modelName: categoryInfo.modelName,
            categoryName: categoryInfo.categoryName,
        });
        await newStyle.save();
        await mongoose.disconnect();
        return "Add New Category And First Style For Text To Image Page Is Successfuly !!";
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
        let categoryData = await textToImageCategoryModel.findOne({ name: categoryName });
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

async function updateCategoryData(categoryId, oldCategoryName, newCategoryName) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        const result = await textToImageCategoryModel.updateOne({
            _id: categoryId,
        }, {
            name: newCategoryName,
        });
        if (result.modifiedCount === 0) return "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!";
        else {
            const result1 = await textToImageStyleModel.updateMany({
                categoryName: oldCategoryName,
            }, {
                categoryName: newCategoryName,
            });
            await mongoose.disconnect();
            return "Category Updating Process Is Succesfuly !!"
        };
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

module.exports = {
    getCategoryData,
    updateCategoryData,
    getAllCategoriesData,
    addNewCategory,
};