// Import Text To Image Category Model And Text To Image Style Model Object

const { categoryModel, styleModel } = require("../models/all.models");

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
        const categoriesCount = await categoryModel.countDocuments({ service: categoryInfo.service });
        await (new categoryModel({
            service: categoryInfo.service,
            imgSrc: categoryInfo["categoryImgFile"][0].path,
            name: categoryInfo.categoryName,
            sortNumber: categoriesCount + 1,
        })).save();
        await (new styleModel({
            service: categoryInfo.service,
            imgSrc: categoryInfo["styleImgFile"][0].path,
            name: categoryInfo.styleName,
            prompt: categoryInfo.stylePrompt,
            negative_prompt: categoryInfo.styleNegativePrompt,
            modelName: categoryInfo.modelName,
            categoryName: categoryInfo.categoryName,
            sortNumber: 1,
            ...(categoryInfo.service === "image-to-image" && { ddim_steps: categoryInfo.ddim_steps, strength: categoryInfo.strength }),
        })).save();
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

async function updateCategoryData(categoryId, service, newCategoryInfo) {
    try {
        const theSecondCategory = await categoryModel.findOne({ sortNumber: newCategoryInfo.newCategorySortNumber, service });
        const theFirstCategory = await categoryModel.findOneAndUpdate({ _id: categoryId }, {
            name: newCategoryInfo.newCategoryName,
            sortNumber: newCategoryInfo.newCategorySortNumber,
        }, { returnOriginal: true });
        await categoryModel.updateOne({
            _id: theSecondCategory._id,
        }, {
            sortNumber: theFirstCategory.sortNumber,
        });
        // if (newCategoryInfo.newCategoryName === theFirstCategory.name) {
        //     return {
        //         msg: "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!",
        //         error: true,
        //         data: {},
        //     }
        // }
        await styleModel.updateMany({
            categoryName: theFirstCategory.name,
            service,
        }, {
            categoryName: newCategoryInfo.newCategoryName,
            service,
        });
        return {
            msg: "Updating Category Info Process Has Been Succesfuly !!",
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
        const categoryStylesData = await styleModel.find({ categoryName: categoryData.name });
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
        await styleModel.deleteMany({ categoryName: categoryData.name });
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
    updateCategoryData,
    getAllCategoriesData,
    addNewCategory,
    deleteCategoryData,
}