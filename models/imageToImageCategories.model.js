// Import Image To Image Category Model And Image To Image Style Model Object

const { imageToImageCategoryModel, imageToImageStyleModel } = require("../models/all.models");

async function getAllCategoriesData() {
    try {
        return {
            msg: "Get All Categories Data Process Has Been Successfully !!",
            error: false,
            data: await imageToImageCategoryModel.find({}).sort({ sortNumber: 1 }),
        }
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
        return {
            msg: "Adding New Category And First Style For Image To Image Page Process Has Been Successfuly !!",
            error: false,
            data: {},
        };
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
        if (newCategoryInfo.newCategoryName === theFirstCategory.name) {
            return {
                msg: "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!",
                error: true,
                data: {},
            };
        }
        await imageToImageStyleModel.updateMany({
            categoryName: theFirstCategory.name,
        }, {
            categoryName: newCategoryInfo.newCategoryName,
        });
        return {
            msg: "Updating Category Info Process Has Been Succesfuly !!",
            error: false,
            data: {},
        }
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
            return {
                msg: "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!",
                error: true,
                data: {},
            };
        }
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
        return {
            msg: "Deleting Category Data Process Has Been Successfully !!",
            error: false,
            data: { categoryData, categoryStylesData },
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