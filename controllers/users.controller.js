function createNewUser(req, res) {
    let email = req.body.email.toLowerCase(),
        password = req.body.password,
        firstName = req.body.firstName,
        lastName = req.body.lastName;
    // Start Handle Email Value To Check It Before Save In DB
    const { isEmail } = require("../global/functions");
    // Check If Email, Password And Name Are Exist
    if (email.length > 0 && password.length > 0 && firstName.length > 0 && lastName.length > 0) {
        // Check If Email Valid
        if (isEmail(email)) {
            const { createNewUser } = require("../models/users.model");
            // Create New User
            createNewUser(email, password, firstName, lastName).then((msg) => {
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
    // Start Handle Email Value To Check It Before Save In DB
    const { isEmail } = require("../global/functions");
    // Check If Email And Password Are Exist
    if (email.length > 0 && password.length > 0) {
        // Check If Email Valid
        if (isEmail(email)) {
            const { login } = require("../models/users.model");
            login(email, password).then((user) => {
                res.json(user);
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

module.exports = {
    createNewUser,
    login,
    getUserInfo,
}