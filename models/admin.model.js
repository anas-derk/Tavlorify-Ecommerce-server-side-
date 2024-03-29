// Import Admin, Text To Image Style Model And Image To Image Style Model Object

const { adminModel, textToImageStyleModel, imageToImageStyleModel } = require("../models/all.models");

const { compare } = require("bcryptjs");

async function adminLogin(email, password) {
    try {
        // Check If Email Is Exist
        const user = await adminModel.findOne({ email });
        if (user) {
            // require bcryptjs module for password encrypting
            // Check From Password
            const isTruePassword = await compare(password, user.password);
            if (isTruePassword)
                return {
                    msg: "Admin Logining Process Has Been Successfully !!",
                    error: false,
                    data: {
                        _id: user._id,
                    },
                };
            return {
                msg: "Sorry, The Email Or Password Is Not Valid !!",
                error: true,
                data: {},
            }
        }
        return {
            msg: "Sorry, The Email Or Password Is Not Valid !!",
            error: true,
            data: {},
        }
    }
    catch (err) {
        throw Error(err);
    }
}

async function getAdminUserInfo(userId) {
    try {
        // Check If User Is Exist
        const user = await adminModel.findById(userId);
        if (user) return {
            msg: `Get Admin Info For Id: ${user._id} Process Has Been Successfully !!`,
            error: false,
            data: user,
        }
        return {
            msg: "Sorry, The User Is Not Exist, Please Enter Another User Id !!",
            error: true,
            data: {},
        }
    } catch (err) {
        throw Error(err);
    }
}

async function handleChangeStyleImagePath(model, styleId, newFilePath) {
    const styleData = await model.findOneAndUpdate({ _id: styleId }, { imgSrc: newFilePath });
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
        }
    };
}

async function updateStyleImagePath(service, styleId, newFilePath) {
    try {
        if (service === "text-to-image") {
            return handleChangeStyleImagePath(textToImageStyleModel, styleId, newFilePath);
        }
        return handleChangeStyleImagePath(imageToImageStyleModel, styleId, newFilePath);
    } catch (err) {
        throw Error(err);
    }
}

module.exports = {
    adminLogin,
    getAdminUserInfo,
    updateStyleImagePath,
}