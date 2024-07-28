// Import Image To Image Style Model Object

const { faceSwapStyleModel } = require("./all.models");

async function getAllCategoryStylesData(categoryName){
    try {
        return {
            msg: `Get All Category Styles For ${categoryName} In Face Swap Service Process Has Been Successfully !!`,
            error: false,
            data: await faceSwapStyleModel.find({ categoryName }).sort({ sortNumber: 1 })
        };
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
        return {
            msg: "Adding New Category Style For Face Swap Page Process Has Been Succesfuly !!",
            error: false,
            data: {},
        };
    }
    catch (err) {
        throw Error(err);
    }
}

module.exports = {
    getAllCategoryStylesData,
    addNewStyle,
}