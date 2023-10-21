async function getAdminLogin(req, res) {
    try{
        const email = req.query.email,
            password = req.query.password;
        // Start Handle Email Value To Check It Before Save In DB
        const { isEmail } = require("../global/functions");
        // Check If Email And Password Are Exist
        if (email.length > 0 && password.length > 0) {
            // Check If Email Valid
            if (isEmail(email)) {
                const { adminLogin } = require("../models/admin.model");
                const result = await adminLogin(email.toLowerCase(), password);
                await res.json(result);
            } else {
                // Return Error Msg If Email Is Not Valid
                await res.status(400).json("Error, This Is Not Email Valid !!");
            }
        } else {
            await res.status(400).json("Error, Please Enter Email And Password Or Rest Input !!");
        }
    }
    catch(err){
        await res.status(500).json(err);
    }
}

async function putStyleImage(req, res) {
    try{
        const { updateStyleImagePath } = require("../models/admin.model");
        const result = await updateStyleImagePath(req.query.service, req.query.styleId, req.file.path);
        const { unlinkSync } = require("fs");
        if (result !== "sorry, this style is not found") {
            unlinkSync(result);
            await res.json("style image process is succesfuly !!");
        } else {
            unlinkSync(req.file.path);
            await res.status(400).json("sorry, this style is not found");
        }
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

module.exports = {
    getAdminLogin,
    putStyleImage,
};