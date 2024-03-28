// Import Image To Image Category Model And Image To Image Style Model Object

const { imageToImageCategoryModel, imageToImageStyleModel } = require("../models/all.models");

async function getAllCategoriesData() {
    try {
        const categorieData = await imageToImageCategoryModel.find({}).sort({ sortNumber: 1 });
        if (categorieData) {
            return categorieData;
        }
        return "Sorry, There Is No Categories Data Now !!";
    }
    catch (err) {
        throw Error(err);
    }
}

async function getCategoryData(categoryName) {
    try {
        const categoryData = await imageToImageCategoryModel.findOne({ name: categoryName });
        if (categoryData) {
            return categoryData;
        }
        return "Sorry, The Category Is Not Exist !!, Please Enter Another Category Name ..";
    }
    catch (err) {
        throw Error(err);
    }
}

async function addNewCategory(categoryInfo) {
    try {
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
        return "Add New Category And First Style For Image To Image Page Is Successfuly !!";
    }
    catch (err) {
        throw Error(err);
    }
}

async function updateCategoryData(categoryId, newCategoryInfo) {
    try {
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
            return "Category Updating Process Is Succesfuly !!"
        };
    }
    catch (err) {
        throw Error(err);
    }
}

async function deleteCategoryData(categoryId) {
    try {
        const categoryData = await imageToImageCategoryModel.findById(categoryId);
        const categoryStylesData = await imageToImageStyleModel.find({ categoryName: categoryData.name });
        if (!categoryData) {
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
            return { categoryData, categoryStylesData };
        };
    }
    catch (err) {
        throw Error(err);
    }
}

module.exports = {
    getAllCategoriesData,
    getCategoryData,
    addNewCategory,
    updateCategoryData,
    deleteCategoryData,
};