function createNewUser(req, res) {
    const email = req.body.email.toLowerCase(),
        password = req.body.password,
        country = req.body.country;
    // Start Handle Email Value To Check It Before Save In DB
    const { isEmail } = require("../global/functions");
    // Check If Email, Password And Country Are Exist
    if (email.length > 0 && password.length > 0 && country.length > 0) {
        // Check If Email Valid
        if (isEmail(email)) {
            const { createNewUser } = require("../models/users.model");
            // Create New User
            createNewUser(email, password, country).then((msg) => {
                res.json(msg);
            })
                .catch((err) => res.json(err));
        }
        else {
            // Return Error Msg If Email Is Not Valid
            res.status(500).json("Error, This Is Not Email Valid !!");
        }
    } else {
        res.status(500).json("Error, Please Enter Email And Password Or Rest Input !!");
    }
}

function login(req, res) {
    let email = req.query.email.toLowerCase(),
        password = req.query.password;
    console.log(email, password);
    // Start Handle Email Value To Check It Before Save In DB
    const { isEmail } = require("../global/functions");
    // Check If Email And Password Are Exist
    if (email.length > 0 && password.length > 0) {
        // Check If Email Valid
        if (isEmail(email)) {
            const { login } = require("../models/users.model");
            login(email, password).then((result) => {
                res.json(result);
            })
                .catch((err) => res.json(err));
        } else {
            // Return Error Msg If Email Is Not Valid
            res.status(500).json("Error, This Is Not Email Valid !!");
        }
    } else {
        res.status(500).json("Error, Please Enter Email And Password Or Rest Input !!");
    }
}

function getUserInfo(req, res) {
    let userId = req.params.userId;
    if (!userId) res.status(500).json("Sorry, Please Send User Id !!");
    else {
        const { getUserInfo } = require("../models/users.model");
        getUserInfo(userId).then((user) => {
            res.json(user);
        })
            .catch((err) => res.json(err));
    }
}

function getAllUsers(req, res) {
    const { getAllUsers } = require("../models/users.model");
    getAllUsers().then((result) => {
        res.json(result);
    })
        .catch((err) => res.json(err));
}

function putUserInfo(req, res) {
    const userId = req.params.userId;
    const newUserData = req.body;
    if (!userId || Object.keys(newUserData).length === 0) res.status(500).json("Sorry, Please Send User Id And New User Data !!");
    else {
        const { updateUserInfo } = require("../models/users.model");
        updateUserInfo(userId, newUserData).then((result) => {
            res.json(result);
        })
            .catch((err) => res.json(err));
    }
}

async function postImageAfterCroping(req, res) {
    const cropingDetails = req.body;
    const sharp = require("sharp");
    try {
        const imagePath = `assets/images/cropedImages/cropedImage${Math.random()}_${Date.now()}__.png`;
        const imageBuffer = sharp(cropingDetails.imagePath);
        const { width, height } = await imageBuffer.metadata();
        if (width < height) {
            await imageBuffer.resize({ fit: "cover", width: cropingDetails.width, height: null })
                .extract({ width: cropingDetails.width, height: cropingDetails.height, left: cropingDetails.left, top: cropingDetails.top })
                .toFile(imagePath);
        } else if (width > height) {
            await imageBuffer.resize({ fit: "cover", width: null, height: cropingDetails.height })
                .extract({ width: cropingDetails.width, height: cropingDetails.height, left: cropingDetails.left, top: cropingDetails.top })
                .toFile(imagePath);
        }
        res.json(imagePath);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    createNewUser,
    login,
    getUserInfo,
    getAllUsers,
    putUserInfo,
    postImageAfterCroping,
}