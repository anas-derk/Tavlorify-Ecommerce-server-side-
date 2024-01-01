// Import Mongoose And Text To Image Style Model Object

const { mongoose, textToImageStyleModel } = require("../models/all.models");

async function get_all_category_styles_data(categoryName) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        // Check If Email Is Exist
        const categoryStylesData = await textToImageStyleModel.find({ categoryName }).sort({ sortNumber: 1 });
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
        await mongoose.connect(process.env.DB_URL);
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
        await mongoose.disconnect();
        return "Adding New Category Style For Text To Image Page Process Is Succesfuly !!";
    }
    catch (err) {
        console.log(err);
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function updateStyleData(styleId, categoryName, newCategoryInfo) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const theSecondStyle = await textToImageStyleModel.findOne({ sortNumber: newCategoryInfo.newCategoryStyleSortNumber, categoryName });
        const theFirstStyle = await textToImageStyleModel.findOneAndUpdate({ _id: styleId }, {
            name: newCategoryInfo.newName,
            prompt: newCategoryInfo.newPrompt,
            negative_prompt: newCategoryInfo.newNegativePrompt,
            sortNumber: newCategoryInfo.newCategoryStyleSortNumber,
            modelName: newCategoryInfo.newModelName,
        }, { returnOriginal: true });
        await textToImageStyleModel.updateOne({
            _id: theSecondStyle._id,
        }, {
            sortNumber: theFirstStyle.sortNumber,
        });
        await mongoose.disconnect();
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function deleteStyleData(styleId, categoryName) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const stylesCount = await textToImageStyleModel.countDocuments({ categoryName: categoryName });
        const styleData = await textToImageStyleModel.findOneAndDelete({
            _id: styleId,
        });
        if (!styleData) {
            await mongoose.disconnect();
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
    get_all_category_styles_data,
    updateStyleData,
    deleteStyleData,
    addNewStyle,
}