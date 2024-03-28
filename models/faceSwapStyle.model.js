// Import Image To Image Style Model Object

const { faceSwapStyleModel } = require("./all.models");

async function getAllCategoryStylesData(categoryName){
    try {
        const stylesData = await faceSwapStyleModel.find({ categoryName }).sort({ sortNumber: 1 });
        return stylesData;
    }
    catch (err) {
        throw Error(err);
    }
}

async function addNewStyle(imagePaths, categoryName) {
    try {
        const stylesCount = await faceSwapStyleModel.countDocuments({ categoryName});
        const newStyle = new faceSwapStyleModel({
            imgSrcList: imagePaths,
            categoryName,
            sortNumber: stylesCount + 1,
        });
        await newStyle.save();
        return "Adding New Category Style For Face Swap Page Process Is Succesfuly !!";
    }
    catch (err) {
        throw Error(err);
    }
}

module.exports = {
    getAllCategoryStylesData,
    addNewStyle,
}