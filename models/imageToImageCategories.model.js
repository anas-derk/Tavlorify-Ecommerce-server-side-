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

async function updateCategoryData(categoryId, oldCategoryName, newCategoryName) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        const result = await imageToImageCategoryModel.updateOne({
            _id: categoryId,
        }, {
            name: newCategoryName,
        });
        if (result.modifiedCount === 0) return "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!";
        else {
            const result1 = await imageToImageStyleModel.updateMany({
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

async function deleteCategoryData(categoryId) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        const categoryData = await imageToImageCategoryModel.findById(categoryId);
        const categoryStylesData = await imageToImageStyleModel.find({ categoryName: categoryData.name });
        if (!categoryData) {
            await mongoose.disconnect();
            return "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!";
        }
        else {
            await imageToImageCategoryModel.deleteOne({
                _id: categoryId,
            });
            await imageToImageStyleModel.deleteMany({ categoryName: categoryData.name });
            await mongoose.disconnect();
            return { categoryData, categoryStylesData };
        };
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
    updateCategoryData,
    deleteCategoryData,
};