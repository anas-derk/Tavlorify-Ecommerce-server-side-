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

module.exports = { getAdminLogin };