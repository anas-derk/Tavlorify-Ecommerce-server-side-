// Import Text To Image Style Model Object

const { textToImageCategoryModel, textToImageStyleModel } = require("../models/all.models");

async function getAllCategoriesData() {
    try {
        return {
            msg: "Get All Categories Data For Text To Image Process Has Been Successfully !!",
            error: false,
            data: await textToImageCategoryModel.find({}).sort({ sortNumber: 1 }),
        };
    }
    catch (err) {
        throw Error(err);
    }
}

async function getCategoryData(categoryName) {
    try {
        return {
            msg: `Get ${categoryName} Data Process Has Been Successfully !!`,
            error: false,
            data: await textToImageCategoryModel.findOne({ name: categoryName })
        }
    }
    catch (err) {
        throw Error(err);
    }
}

async function getAllStylesData(categoryName) {
    try {
        return {
            msg: "Get All Category Styles Data Process Has Been Successfully !!",
            error: false,
            data: await textToImageStyleModel.find({ categoryName }).sort({ sortNumber: 1 }),
        }
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

async function addNewStyle(styleData) {
    try {
        const stylesCount = await textToImageStyleModel.countDocuments({ categoryName: styleData.categoryName });
        const newStyleData = new textToImageStyleModel({
            imgSrc: styleData.imgSrc,
            name: styleData.styleName,
            prompt: styleData.stylePrompt,
            negative_prompt: styleData.styleNegativePrompt,
            modelName: styleData.modelName,
            categoryName: styleData.categoryName,
            sortNumber: stylesCount + 1,
        });
        await newStyleData.save();
        return {
            msg: "Adding New Category Style For Text To Image Page Process Is Succesfuly !!",
            error: false,
            data: {},
        }
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
        const categoryData = await textToImageCategoryModel.findById(categoryId);
        const categoryStylesData = await textToImageStyleModel.find({ categoryName: categoryData.name });
        if (!categoryData) {
            return {
                msg: "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!",
                error: true,
                data: {},
            };
        }
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

async function updateStyleData(styleId, categoryName, newCategoryStyleInfo) {
    try {
        const theSecondStyle = await textToImageStyleModel.findOne({ sortNumber: newCategoryStyleInfo.newCategoryStyleSortNumber, categoryName });
        const theFirstStyle = await textToImageStyleModel.findOneAndUpdate({ _id: styleId }, {
            name: newCategoryStyleInfo.newName,
            prompt: newCategoryStyleInfo.newPrompt,
            negative_prompt: newCategoryStyleInfo.newNegativePrompt,
            sortNumber: newCategoryStyleInfo.newCategoryStyleSortNumber,
            modelName: newCategoryStyleInfo.newModelName,
        }, { returnOriginal: true });
        await textToImageStyleModel.updateOne({
            _id: theSecondStyle._id,
        }, {
            sortNumber: theFirstStyle.sortNumber,
        });
        return {
            msg: "Updating Style Info Process Has Been Successfully !!",
            error: false,
            data: {},
        }
    }
    catch (err) {
        throw Error(err);
    }
}

async function deleteStyleData(styleId, categoryName) {
    try {
        const stylesCount = await textToImageStyleModel.countDocuments({ categoryName: categoryName });
        const styleData = await textToImageStyleModel.findOneAndDelete({
            _id: styleId,
        });
        if (!styleData) {
            return {
                msg: "Sorry, This Category Style Is Not Exist, Please Send Valid Style Id !!",
                error: true,
                data: {},
            };
        }
        if (stylesCount !== styleData.sortNumber) {
            const allCategoryStyles = await textToImageStyleModel.find({ categoryName: styleData.categoryName });
            let allCategoryStylesAfterChangeSortNumber = allCategoryStyles.map((style) => {
                if (style.sortNumber > styleData.sortNumber) {
                    style.sortNumber = style.sortNumber - 1;
                }
                return {
                    msg: "Deleting Style Data Process Has Been Successfully !!",
                    error: false,
                    data: {
                        imgSrc: style.imgSrc,
                        name: style.name,
                        prompt: style.prompt,
                        negative_prompt: style.negative_prompt,
                        num_inference_steps: style.num_inference_steps,
                        refine: style.refine,
                        modelName: style.modelName,
                        categoryName: style.categoryName,
                        sortNumber: style.sortNumber,
                    },
                }
            });
            await textToImageStyleModel.deleteMany({ categoryName: categoryName });
            await textToImageStyleModel.insertMany(allCategoryStylesAfterChangeSortNumber);
        }
        return {
            msg: "Deleting Style Data Process Has Been Successfully !!",
            error: false,
            data: styleData.imgSrc,
        };
    }
    catch (err) {
        throw Error(err);
    }
}

module.exports = {
    getAllStylesData,
    updateStyleData,
    deleteStyleData,
    addNewStyle,
    getAllCategoriesData,
    addNewCategory,
    getCategoryData,
    updateCategoryData,
    deleteCategoryData,
}