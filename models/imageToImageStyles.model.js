// Import Image To Image Style Model Object

const { imageToImageStyleModel } = require("../models/all.models");

async function get_all_category_Styles_Data(categoryName){
    try {
        return {
            msg: "Get All Category Styles Data Process Has Been Successfully !!",
            error: false,
            data: await imageToImageStyleModel.find({ categoryName }).sort({ sortNumber: 1 }),
        }
    }
    catch (err) {
        throw Error(err);
    }
}

async function addNewStyle(styleData) {
    try {
        const stylesCount = await imageToImageStyleModel.countDocuments({ categoryName: styleData.categoryName });
        const newStyleData = new imageToImageStyleModel({
            imgSrc: styleData.imgSrc,
            name: styleData.styleName,
            prompt: styleData.stylePrompt,
            negative_prompt: styleData.styleNegativePrompt,
            ddim_steps: styleData.ddim_steps,
            strength: styleData.strength,
            modelName: styleData.modelName,
            categoryName: styleData.categoryName,
            sortNumber: stylesCount + 1,
        });
        await newStyleData.save();
        return {
            msg: "Adding New Category Style For Image To Image Page Process Has Been Succesfuly !!",
            error: false,
            data: {},
        };
    }
    catch (err) {
        throw Error(err);
    }
}

async function updateStyleData(styleId, categoryName, newCategoryStyleInfo){
    try {
        const theSecondStyle = await imageToImageStyleModel.findOne({ sortNumber: newCategoryStyleInfo.newCategoryStyleSortNumber, categoryName });
        const theFirstStyle = await imageToImageStyleModel.findOneAndUpdate({ _id: styleId }, {
            name: newCategoryStyleInfo.newName,
            prompt: newCategoryStyleInfo.newPrompt,
            negative_prompt: newCategoryStyleInfo.newNegativePrompt,
            ddim_steps: newCategoryStyleInfo.newDdimSteps,
            strength: newCategoryStyleInfo.newStrength,
            sortNumber: newCategoryStyleInfo.newCategoryStyleSortNumber,
        }, { returnOriginal: true });
        await imageToImageStyleModel.updateOne({
            _id: theSecondStyle._id,
        }, {
            sortNumber: theFirstStyle.sortNumber,
        });
        return {
            msg: "Updating Style Data Process Has Been Successfully !!",
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
        const stylesCount = await imageToImageStyleModel.countDocuments({ categoryName: categoryName });
        const styleData = await imageToImageStyleModel.findOneAndDelete({
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
            const allCategoryStyles = await imageToImageStyleModel.find({ categoryName: styleData.categoryName });
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
                        ddim_steps: style.ddim_steps,
                        strength: style.strength,
                        categoryName: style.categoryName,
                        sortNumber: style.sortNumber,
                    }
                };
            });
            await imageToImageStyleModel.deleteMany({ categoryName: categoryName });
            await imageToImageStyleModel.insertMany(allCategoryStylesAfterChangeSortNumber);
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
    get_all_category_Styles_Data,
    addNewStyle,
    updateStyleData,
    deleteStyleData,
}