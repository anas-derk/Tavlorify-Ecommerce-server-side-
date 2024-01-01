// Import Mongoose And Text To Image Category Model Object

const { mongoose, textToImageCategoryModel, textToImageStyleModel } = require("../models/all.models");

async function getAllCategoriesData() {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const categorieData = await textToImageCategoryModel.find({}).sort({ sortNumber: 1 });
        await mongoose.disconnect();
        return categorieData;
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function addNewCategory(categoryInfo) {
    try {
        await mongoose.connect(process.env.DB_URL);
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
        await mongoose.disconnect();
        return "Add New Category And First Style For Text To Image Page Is Successfuly !!";
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function getCategoryData(categoryName) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        // Check If Email Is Exist
        const categoryData = await textToImageCategoryModel.findOne({ name: categoryName });
        await mongoose.disconnect();
        return categoryData;
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function updateCategoryData(categoryId, newCategoryInfo) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
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
        const categoryData = await textToImageCategoryModel.findById(categoryId);
        const categoryStylesData = await textToImageStyleModel.find({ categoryName: categoryData.name });
        if (!categoryData) {
            await mongoose.disconnect();
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
            await mongoose.disconnect();
            return { categoryData, categoryStylesData };
        };
    }
    catch (err) {
        console.log(err);
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
    deleteCategoryData,
};