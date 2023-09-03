// Import Mongoose And Image To Image Style Model Object

const { mongoose, imageToImageStyleModel } = require("../models/all.models");

// Import Database URL

const DB_URL = require("../global/DB_URL");

async function get_all_category_Styles_Data(categoryName){
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let categoryStylesData = await imageToImageStyleModel.find({ categoryName }).sort({ sortNumber: 1 });
        if (categoryStylesData) {
            await mongoose.disconnect();
            return categoryStylesData;
        }
        else {
            mongoose.disconnect();
            return "Sorry, There Is No Styles For This Category Data Now !!";
        }
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function addNewStyle(styleData) {
    try {
        await mongoose.connect(DB_URL);
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
        await mongoose.disconnect();
        return "Adding New Category Style For Image To Image Page Process Is Succesfuly !!";
    }
    catch (err) {
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function updateStyleData(styleId, categoryName, newCategoryStyleSortNumber, newName, newPrompt, newNegativePrompt, newDdimSteps, newStrength){
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        const theSecondStyle = await imageToImageStyleModel.findOne({ sortNumber: newCategoryStyleSortNumber, categoryName: categoryName });
        const theFirstStyle = await imageToImageStyleModel.findOneAndUpdate({ _id: styleId }, {
            name: newName,
            prompt: newPrompt,
            negative_prompt: newNegativePrompt,
            ddim_steps: newDdimSteps,
            strength: newStrength,
            sortNumber: newCategoryStyleSortNumber,
        }, { returnOriginal: true });
        await imageToImageStyleModel.updateOne({
            _id: theSecondStyle._id,
        }, {
            sortNumber: theFirstStyle.sortNumber,
        });
        await mongoose.disconnect();
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function deleteStyleData(styleId, categoryName) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        const stylesCount = await imageToImageStyleModel.countDocuments({ categoryName: categoryName });
        const styleData = await imageToImageStyleModel.findOneAndDelete({
            _id: styleId,
        });
        if (!styleData) {
            await mongoose.disconnect();
            return "Sorry, This Category Style Is Not Exist, Please Send Valid Style Id !!";
        } else {
            if (stylesCount !== styleData.sortNumber) {
                const allCategoryStyles = await imageToImageStyleModel.find({ categoryName: styleData.categoryName });
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
                        ddim_steps: style.ddim_steps,
                        strength: style.strength,
                        categoryName: style.categoryName,
                        sortNumber: style.sortNumber,
                    };
                });
                await imageToImageStyleModel.deleteMany({ categoryName: categoryName });
                await imageToImageStyleModel.insertMany(allCategoryStylesAfterChangeSortNumber);
            }
            await mongoose.disconnect();
            return styleData.imgSrc;
        }
    }
    catch (err) {
        console.log(err);
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

module.exports = {
    get_all_category_Styles_Data,
    addNewStyle,
    updateStyleData,
    deleteStyleData,
}