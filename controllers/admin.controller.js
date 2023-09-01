function getAdminLogin(req, res) {
    let email = req.query.email.toLowerCase(),
        password = req.query.password;
    // Start Handle Email Value To Check It Before Save In DB
    const { isEmail } = require("../global/functions");
    // Check If Email And Password Are Exist
    if (email.length > 0 && password.length > 0) {
        // Check If Email Valid
        if (isEmail(email)) {
            const { adminLogin } = require("../models/admin.model");
            adminLogin(email, password).then((user) => {
                console.log(user);
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

function putStyleImage(req, res) {
    const { updateStyleImagePath } = require("../models/admin.model");
    updateStyleImagePath(req.query.service, req.query.styleId, req.file.path)
    .then((result) => {
        const { unlinkSync } = require("fs");
        if (result !== "sorry, this style is not found") {
            unlinkSync(result);
            res.json("style image process is succesfuly !!");
        } else {
            unlinkSync(req.file.path);
            res.json("sorry, this style is not found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
}

module.exports = {
    getAdminLogin,
    putStyleImage,
};