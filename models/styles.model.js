// Import Text To Image Style Model Object

const { styleModel } = require("../models/all.models");

async function getAllCategoryStylesData(categoryName) {
    try {
        return {
            msg: "Get All Category Styles Data Process Has Been Successfully !!",
            error: false,
            data: await styleModel.find({ categoryName }).sort({ sortNumber: 1 }),
        }
    }
    catch (err) {
        throw Error(err);
    }
}

async function addNewStyle(styleData) {
    try {
        const stylesCount = await styleModel.countDocuments({ categoryName: styleData.categoryName });
        const newStyleData = new styleModel({
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

async function updateStyleData(styleId, categoryName, newCategoryStyleInfo) {
    try {
        const theSecondStyle = await styleModel.findOne({ sortNumber: newCategoryStyleInfo.newCategoryStyleSortNumber, categoryName });
        const theFirstStyle = await styleModel.findOneAndUpdate({ _id: styleId }, {
            name: newCategoryStyleInfo.newName,
            prompt: newCategoryStyleInfo.newPrompt,
            negative_prompt: newCategoryStyleInfo.newNegativePrompt,
            sortNumber: newCategoryStyleInfo.newCategoryStyleSortNumber,
            modelName: newCategoryStyleInfo.newModelName,
        }, { returnOriginal: true });
        await styleModel.updateOne({
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
        const stylesCount = await styleModel.countDocuments({ categoryName: categoryName });
        const styleData = await styleModel.findOneAndDelete({
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
            const allCategoryStyles = await styleModel.find({ categoryName: styleData.categoryName });
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
            await styleModel.deleteMany({ categoryName: categoryName });
            await styleModel.insertMany(allCategoryStylesAfterChangeSortNumber);
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
    getAllCategoryStylesData,
    updateStyleData,
    deleteStyleData,
    addNewStyle,
}