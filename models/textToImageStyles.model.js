// Import Text To Image Style Model Object

const { textToImageStyleModel } = require("../models/all.models");

async function get_all_category_styles_data(categoryName) {
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
            data: await textToImageStyleModel.find({ categoryName }).sort({ sortNumber: 1 }),
        }
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
            return "Sorry, This Category Style Is Not Exist, Please Send Valid Style Id !!";
        } else {
            if (stylesCount !== styleData.sortNumber) {
                const allCategoryStyles = await textToImageStyleModel.find({ categoryName: styleData.categoryName });
                let allCategoryStylesAfterChangeSortNumber = allCategoryStyles.map((style) => {
                    if (style.sortNumber > styleData.sortNumber) {
                        style.sortNumber = style.sortNumber - 1;
                    }
                    return {
                        imgSrc: style.imgSrc,
                        name: style.name,
                        prompt: style.prompt,
                        negative_prompt: style.negative_prompt,
                        num_inference_steps: style.num_inference_steps,
                        refine: style.refine,
                        modelName: style.modelName,
                        categoryName: style.categoryName,
                        sortNumber: style.sortNumber,
                    };
                });
                await textToImageStyleModel.deleteMany({ categoryName: categoryName });
                await textToImageStyleModel.insertMany(allCategoryStylesAfterChangeSortNumber);
            }
            return styleData.imgSrc;
        }
    }
    catch (err) {
        throw Error(err);
    }
}

module.exports = {
    get_all_category_styles_data,
    updateStyleData,
    deleteStyleData,
    addNewStyle,
}