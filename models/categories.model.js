// Import Text To Image Category Model And Text To Image Style Model Object

const { categoryModel, textToImageStyleModel, imageToImageStyleModel } = require("../models/all.models");

async function getAllCategoriesData(service) {
    try {
        return {
            msg: `Get All Categories Data For ${service} Process Has Been Successfully !!`,
            error: false,
            data: await categoryModel.find({ service }).sort({ sortNumber: 1 }),
        };
    }
    catch (err) {
        throw Error(err);
    }
}

async function addNewCategory(categoryInfo) {
    try {
        const categoriesCount = await textToImageCategoryModel.countDocuments({});
        const newCategory = new categoryModel({
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

async function getCategoryData(service, categoryName) {
    try {
        return {
            msg: "Get All Category Data Process Has Been Successfully !!",
            error: false,
            data: await categoryModel.findOne({ name: categoryName, service }),
        }
    }
    catch (err) {
        throw Error(err);
    }
}

async function updateCategoryData(categoryId, newCategoryInfo) {
    try {
        const theSecondCategory = await categoryModel.findOne({ sortNumber: newCategoryInfo.newCategorySortNumber });
        const theFirstCategory = await categoryModel.findOneAndUpdate({ _id: categoryId }, {
            name: newCategoryInfo.newCategoryName,
            sortNumber: newCategoryInfo.newCategorySortNumber,
        }, { returnOriginal: true });
        await categoryModel.updateOne({
            _id: theSecondCategory._id,
        }, {
            sortNumber: theFirstCategory.sortNumber,
        });
        if (newCategoryInfo.newCategoryName === theFirstCategory.name)
            return {
                msg: "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!",
                error: true,
                data: {},
            };
        await textToImageStyleModel.updateMany({
            categoryName: theFirstCategory.name,
        }, {
            categoryName: newCategoryInfo.newCategoryName,
        });
        return {
            msg: "Updating Category Info Process Is Succesfuly !!",
            error: false,
            data: {},
        };
    }
    catch (err) {
        throw Error(err);
    }
}

async function deleteCategoryData(categoryId) {
    try {
        const categoryData = await categoryModel.findById(categoryId);
        const categoryStylesData = await textToImageStyleModel.find({ categoryName: categoryData.name });
        if (!categoryData) {
            return {
                msg: "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!",
                error: true,
                data: {},
            };
        }
        const categoriesCount = await categoryModel.countDocuments({});
        await categoryModel.deleteOne({
            _id: categoryId,
        });
        if (categoriesCount !== categoryData.sortNumber) {
            const allCategoies = await categoryModel.find({});
            let allCategoiesAfterChangeSortNumber = allCategoies.map((category) => {
                if (category.sortNumber > categoryData.sortNumber) {
                    category.sortNumber = category.sortNumber - 1;
                }
                return { imgSrc: category.imgSrc, name: category.name, sortNumber: category.sortNumber };
            });
            await categoryModel.deleteMany({});
            await categoryModel.insertMany(allCategoiesAfterChangeSortNumber);
        }
        await textToImageStyleModel.deleteMany({ categoryName: categoryData.name });
        return {
            msg: "Deleting Category Process Has Been Successfully !!",
            error: false,
            data: { categoryData, categoryStylesData },
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
}