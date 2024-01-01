// Import Mongoose And Image To Image Category Model Object

const { mongoose, imageToImageCategoryModel, imageToImageStyleModel } = require("../models/all.models");

async function getAllCategoriesData() {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        // Check If Email Is Exist
        let categorieData = await imageToImageCategoryModel.find({}).sort({ sortNumber: 1 });
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
        await mongoose.connect(process.env.DB_URL);
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
        await mongoose.connect(process.env.DB_URL);
        const categoriesCount = await imageToImageCategoryModel.countDocuments({});
        const newCategory = new imageToImageCategoryModel({
            imgSrc: categoryInfo["categoryImgFile"][0].path,
            name: categoryInfo.categoryName,
            sortNumber: categoriesCount + 1,
        });
        await newCategory.save();
        const newStyle = new imageToImageStyleModel({
            imgSrc: categoryInfo["styleImgFile"][0].path,
            name: categoryInfo.styleName,
            prompt: categoryInfo.stylePrompt,
            negative_prompt: categoryInfo.styleNegativePrompt,
            ddim_steps: categoryInfo.ddim_steps,
            strength: categoryInfo.strength,
            categoryName: categoryInfo.categoryName,
            sortNumber: 1,
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

async function updateCategoryData(categoryId, newCategoryInfo) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const theSecondCategory = await imageToImageCategoryModel.findOne({ sortNumber: newCategoryInfo.newCategorySortNumber });
        const theFirstCategory = await imageToImageCategoryModel.findOneAndUpdate({ _id: categoryId }, {
            name: newCategoryInfo.newCategoryName,
            sortNumber: newCategoryInfo.newCategorySortNumber,
        }, { returnOriginal: true });
        await imageToImageCategoryModel.updateOne({
            _id: theSecondCategory._id,
        }, {
            sortNumber: theFirstCategory.sortNumber,
        });
        if (newCategoryInfo.newCategoryName === theFirstCategory.name) return "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!";
        else {
            await imageToImageStyleModel.updateMany({
                categoryName: theFirstCategory.name,
            }, {
                categoryName: newCategoryInfo.newCategoryName,
            });
            await mongoose.disconnect();
            return "Category Updating Process Is Succesfuly !!"
        };
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function deleteCategoryData(categoryId) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const categoryData = await imageToImageCategoryModel.findById(categoryId);
        const categoryStylesData = await imageToImageStyleModel.find({ categoryName: categoryData.name });
        if (!categoryData) {
            await mongoose.disconnect();
            return "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!";
        }
        else {
            const categoriesCount = await imageToImageCategoryModel.countDocuments({});
            await imageToImageCategoryModel.deleteOne({
                _id: categoryId,
            });
            if (categoriesCount !== categoryData.sortNumber) {
                const allCategoies = await imageToImageCategoryModel.find({});
                let allCategoiesAfterChangeSortNumber = allCategoies.map((category) => {
                    if (category.sortNumber > categoryData.sortNumber) {
                        category.sortNumber = category.sortNumber - 1;
                    }
                    return { imgSrc: category.imgSrc, name: category.name, sortNumber: category.sortNumber };
                });
                await imageToImageCategoryModel.deleteMany({});
                await imageToImageCategoryModel.insertMany(allCategoiesAfterChangeSortNumber);
            }
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