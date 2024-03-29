// Import Text To Image Category Model And Text To Image Style Model Object

const { textToImageCategoryModel, textToImageStyleModel } = require("../models/all.models");

async function getAllCategoriesData() {
    try {
        return await textToImageCategoryModel.find({}).sort({ sortNumber: 1 });
    }
    catch (err) {
        throw Error(err);
    }
}

async function addNewCategory(categoryInfo) {
    try {
        const categoriesCount = await textToImageCategoryModel.countDocuments({});
        const newCategory = new textToImageCategoryModel({
            imgSrc: categoryInfo["categoryImgFile"][0].path,
            name: categoryInfo.categoryName,
            sortNumber: categoriesCount + 1,
        });
        await newCategory.save();
        const newStyle = new textToImageStyleModel({
            imgSrc: categoryInfo["styleImgFile"][0].path,
            name: categoryInfo.styleName,
            prompt: categoryInfo.stylePrompt,
            negative_prompt: categoryInfo.styleNegativePrompt,
            modelName: categoryInfo.modelName,
            categoryName: categoryInfo.categoryName,
            sortNumber: 1,
        });
        await newStyle.save();
        return {
            msg: "Adding New Category And First Style For Text To Image Page Process Has Been Successfuly !!",
            error: false,
            data: {},
        };
    }
    catch (err) {
        throw Error(err);
    }
}

async function getCategoryData(categoryName) {
    try {
        const categoryData = await textToImageCategoryModel.findOne({ name: categoryName });
        return categoryData;
    }
    catch (err) {
        throw Error(err);
    }
}

async function updateCategoryData(categoryId, newCategoryInfo) {
    try {
        const theSecondCategory = await textToImageCategoryModel.findOne({ sortNumber: newCategoryInfo.newCategorySortNumber });
        const theFirstCategory = await textToImageCategoryModel.findOneAndUpdate({ _id: categoryId }, {
            name: newCategoryInfo.newCategoryName,
            sortNumber: newCategoryInfo.newCategorySortNumber,
        }, { returnOriginal: true });
        await textToImageCategoryModel.updateOne({
            _id: theSecondCategory._id,
        }, {
            sortNumber: theFirstCategory.sortNumber,
        });
        if (newCategoryInfo.newCategoryName === theFirstCategory.name) return "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!";
        else {
            await textToImageStyleModel.updateMany({
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
        const categoryData = await textToImageCategoryModel.findById(categoryId);
        const categoryStylesData = await textToImageStyleModel.find({ categoryName: categoryData.name });
        if (!categoryData) {
            return "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!";
        }
        else {
            const categoriesCount = await textToImageCategoryModel.countDocuments({});
            await textToImageCategoryModel.deleteOne({
                _id: categoryId,
            });
            if (categoriesCount !== categoryData.sortNumber) {
                const allCategoies = await textToImageCategoryModel.find({});
                let allCategoiesAfterChangeSortNumber = allCategoies.map((category) => {
                    if (category.sortNumber > categoryData.sortNumber) {
                        category.sortNumber = category.sortNumber - 1;
                    }
                    return { imgSrc: category.imgSrc, name: category.name, sortNumber: category.sortNumber };
                });
                await textToImageCategoryModel.deleteMany({});
                await textToImageCategoryModel.insertMany(allCategoiesAfterChangeSortNumber);
            }
            await textToImageStyleModel.deleteMany({ categoryName: categoryData.name });
            return { categoryData, categoryStylesData };
        };
    }
    catch (err) {
        throw Error(err);
    }
}

module.exports = {
    getCategoryData,
    updateCategoryData,
    getAllCategoriesData,
    addNewCategory,
    deleteCategoryData,
};