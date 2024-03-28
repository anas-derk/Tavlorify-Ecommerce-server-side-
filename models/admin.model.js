// Import Admin, Text To Image Style Model And Image To Image Style Model Object

const { adminModel, textToImageStyleModel, imageToImageStyleModel } = require("../models/all.models");

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");

async function adminLogin(email, password) {
    try {
        const user = await adminModel.findOne({ email });
        if (user) {
            // Check From Password
            const isTruePassword = await bcrypt.compare(password, user.password);
            if (isTruePassword) return user;
            return "Sorry, The Password Entereted Is Not True !!";
        }
        return "Sorry, The User Is Not Exist !!, Please Enter Another Email ..";
    }
    catch (err) {
        throw Error(err);
    }
}

async function handleChangeStyleImagePath(model, styleId, newFilePath) {
    const styleData = await model.findById(styleId);
    if (!styleData) {
        return "sorry, this style is not found";
    }
    await model.updateOne({
        _id: styleId,
    }, { imgSrc: newFilePath });
    return styleData.imgSrc;
}

async function updateStyleImagePath(service, styleId, newFilePath) {
    try {
        if (service === "text-to-image") {
            return handleChangeStyleImagePath(textToImageStyleModel, styleId, newFilePath);
        } else {
            return handleChangeStyleImagePath(imageToImageStyleModel, styleId, newFilePath);
        }
    } catch (err) {
        throw Error(err);
    }
}

module.exports = {
    adminLogin,
    updateStyleImagePath,
}