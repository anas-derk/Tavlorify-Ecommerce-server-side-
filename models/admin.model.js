// Import Mongoose And Admin Model Object

const { mongoose, adminModel, textToImageStyleModel, imageToImageStyleModel } = require("../models/all.models");

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");

async function adminLogin(email, password) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        // Check If Email Is Exist
        let user = await adminModel.findOne({ email });
        if (user) {
            // Check From Password
            let isTruePassword = await bcrypt.compare(password, user.password);
            await mongoose.disconnect();
            if (isTruePassword) return user;
            else return "Sorry, The Password Entereted Is Not True !!"
        }
        else {
            mongoose.disconnect();
            return "Sorry, The User Is Not Exist !!, Please Enter Another Email ..";
        }
    }
    catch (err) {
        console.log(err);
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function handleChangeStyleImagePath(model, styleId, newFilePath) {
    const styleData = await model.findById(styleId);
    if (!styleData) {
        await mongoose.disconnect();
        return "sorry, this style is not found";
    } else {
        await model.updateOne({
            _id: styleId,
        }, { imgSrc: newFilePath });
        await mongoose.disconnect();
        return styleData.imgSrc;
    }
}

async function updateStyleImagePath(service, styleId, newFilePath) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        if (service === "text-to-image") {
            return handleChangeStyleImagePath(textToImageStyleModel, styleId, newFilePath);
        } else {
            return handleChangeStyleImagePath(imageToImageStyleModel, styleId, newFilePath);
        }
    } catch (err) {
        console.log(err);
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

module.exports = {
    adminLogin,
    updateStyleImagePath,
}