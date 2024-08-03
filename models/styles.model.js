// Import Text To Image Style Model Object

const { styleModel, faceSwapStyleModel } = require("../models/all.models");

async function getAllCategoryStylesData(service, categoryName) {
    try {
        return {
            msg: "Get All Category Styles Data Process Has Been Successfully !!",
            error: false,
            data: service === "face-swap" ? await faceSwapStyleModel.find({ categoryName }).sort({ sortNumber: 1 }) : await styleModel.find({ service, categoryName }).sort({ sortNumber: 1 }),
        }
    }
    catch (err) {
        throw Error(err);
    }
}

async function addNewStyle(styleData) {
    try {
        if (styleData.service === "face-swap") {
            await (new faceSwapStyleModel({
                imgSrcList: styleData.imgSrcList,
                categoryName: styleData.categoryName,
                sortNumber: await faceSwapStyleModel.countDocuments({ categoryName: styleData.categoryName }) + 1,
            })).save();
        } else {
            await (new styleModel({
                service: styleData.service,
                imgSrc: styleData.imgSrc,
                name: styleData.styleName,
                prompt: styleData.stylePrompt,
                negative_prompt: styleData.styleNegativePrompt,
                modelName: styleData.modelName,
                categoryName: styleData.categoryName,
                sortNumber: await styleModel.countDocuments({ categoryName: styleData.categoryName, service: styleData.service }) + 1,
                ...(categoryInfo.service === "image-to-image" && { ddim_steps: categoryInfo.ddim_steps, strength: categoryInfo.strength }),
            })).save();
        }
        return {
            msg: `Adding New Category Style For ${styleData.service} Page Process Is Succesfuly !!`,
            error: false,
            data: {},
        }
    }
    catch (err) {
        throw Error(err);
    }
}

async function updateStyleData(service, styleId, categoryName, newCategoryStyleInfo) {
    try {
        const theSecondStyle = (service === "text-to-image" || service === "image-to-image") ? await styleModel.findOne({ sortNumber: newCategoryStyleInfo.newCategoryStyleSortNumber, categoryName, service }) : await faceSwapStyleModel.findOne({ sortNumber: newCategoryStyleInfo.newCategoryStyleSortNumber, categoryName });
        const theFirstStyle = (service === "text-to-image" || service === "image-to-image") ? await styleModel.findOneAndUpdate({ _id: styleId }, {
            name: newCategoryStyleInfo.newName,
            prompt: newCategoryStyleInfo.newPrompt,
            negative_prompt: newCategoryStyleInfo.newNegativePrompt,
            sortNumber: newCategoryStyleInfo.newCategoryStyleSortNumber,
            modelName: newCategoryStyleInfo.newModelName,
            ...(newCategoryStyleInfo.service === "image-to-image" && { ddim_steps: newCategoryStyleInfo.newDdimSteps, newStrength: newCategoryStyleInfo.strength }),
        }, { returnOriginal: true }) : await faceSwapStyleModel.findOneAndUpdate({ _id: styleId }, {
            sortNumber: newCategoryStyleInfo.newCategoryStyleSortNumber,
        }, { returnOriginal: true });
        (service === "text-to-image" || service === "image-to-image") ? await styleModel.updateOne({
            _id: theSecondStyle._id,
        }, {
            sortNumber: theFirstStyle.sortNumber,
        }) : await faceSwapStyleModel.updateOne({
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

async function updateStyleImagePath(styleId, newImagePath) {
    try {
        const styleData = await styleModel.findOneAndUpdate({ _id: styleId }, { imgSrc: newImagePath });
        if (!styleData) {
            return {
                msg: "Sorry, This Style Is Not Found !!",
                error: true,
                data: {},
            };
        }
        return {
            msg: "Changing Style Image Process Has Been Successfully !!",
            error: false,
            data: {
                imgSrc: styleData.imgSrc,
                newImagePath,
            }
        };
    } catch (err) {
        throw Error(err);
    }
}

async function deleteStyleData(styleId) {
    try {
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
        const stylesCount = await styleModel.countDocuments({ categoryName: styleData.categoryName, service: styleData.service });
        if (stylesCount !== styleData.sortNumber) {
            const allCategoryStyles = await styleModel.find({ categoryName: styleData.categoryName, service: styleData.service });
            let allCategoryStylesAfterChangeSortNumber = allCategoryStyles.map((style) => {
                if (style.sortNumber > styleData.sortNumber) {
                    style.sortNumber = style.sortNumber - 1;
                }
                return {
                    service: style.service,
                    imgSrc: style.imgSrc,
                    name: style.name,
                    prompt: style.prompt,
                    negative_prompt: style.negative_prompt,
                    modelName: style.modelName,
                    ...(style.service === "text-to-image" && { num_inference_steps: style.num_inference_steps, refine: style.refine }),
                    ...(style.service === "image-to-image" && { ddim_steps: style.ddim_steps, strength: style.strength }),
                    categoryName: style.categoryName,
                    sortNumber: style.sortNumber
                }
            });
            await styleModel.deleteMany({ categoryName: styleData.categoryName, service: styleData.service });
            await styleModel.insertMany(allCategoryStylesAfterChangeSortNumber);
        }
        return {
            msg: "Deleting Style Data Process Has Been Successfully !!",
            error: false,
            data: {
                imgSrc: styleData.imgSrc,
            },
        };
    }
    catch (err) {
        throw Error(err);
    }
}

async function deleteFaceSwapStyleData(styleId) {
    try {
        const styleData = await faceSwapStyleModel.findOneAndDelete({
            _id: styleId,
        });
        if (!styleData) {
            return {
                msg: "Sorry, This Category Style Is Not Exist, Please Send Valid Style Id !!",
                error: true,
                data: {},
            };
        }
        const stylesCount = await faceSwapStyleModel.countDocuments({ categoryName: styleData.categoryName });
        if (stylesCount !== styleData.sortNumber) {
            const allCategoryStyles = await faceSwapStyleModel.find({ categoryName: styleData.categoryName });
            let allCategoryStylesAfterChangeSortNumber = allCategoryStyles.map((style) => {
                if (style.sortNumber > styleData.sortNumber) {
                    style.sortNumber = style.sortNumber - 1;
                }
                return {
                    imgSrcList: style.imgSrcList,
                    categoryName: style.categoryName,
                    sortNumber: style.sortNumber
                }
            });
            await faceSwapStyleModel.deleteMany({ categoryName: styleData.categoryName });
            await faceSwapStyleModel.insertMany(allCategoryStylesAfterChangeSortNumber);
        }
        return {
            msg: "Deleting Style Data Process Has Been Successfully !!",
            error: false,
            data: {
                imgSrcList: styleData.imgSrcList,
            },
        };
    }
    catch (err) {
        throw Error(err);
    }
}

module.exports = {
    getAllCategoryStylesData,
    addNewStyle,
    updateStyleData,
    updateStyleImagePath,
    deleteStyleData,
    deleteFaceSwapStyleData
}