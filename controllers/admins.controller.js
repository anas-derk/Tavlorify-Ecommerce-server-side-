const { getResponseObject } = require("../global/functions");

const adminsOPerationsManagmentFunctions = require("../models/admin.model");

const { sign } = require("jsonwebtoken");

const { unlinkSync } = require("fs");

async function getAdminLogin(req, res) {
    try{
        const   email = req.query.email,
                password = req.query.password;
        const result = await adminsOPerationsManagmentFunctions.adminLogin(email.toLowerCase(), password);
        if (!result.error) {
            await res.json({
                ...result,
                data: {
                    token: sign(result.data, process.env.secretKey, {
                        expiresIn: "1h",
                    }),
                }
            });
            return;
        }
        await res.json(result);
    }
    catch(err) {
        console.log(err)
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getAdminUserInfo(req, res) {
    try{
        await res.json(await adminsOPerationsManagmentFunctions.getAdminUserInfo(req.data._id));
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putStyleImage(req, res) {
    try{
        const uploadError = req.uploadError;
        if (uploadError) {
            await res.status(400).json(getResponseObject(uploadError, true, {}));
            return;
        }
        const result = await adminsOPerationsManagmentFunctions.updateStyleImagePath(req.query.service, req.query.styleId, req.file.path);
        if (!result.error) {
            unlinkSync(result.data.imgSrc);
            await res.json(result);
            return;
        }
        unlinkSync(req.file.path);
        await res.status(400).json(getResponseObject("Sorry, This Style Is Not Found", true, {}));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

module.exports = {
    getAdminLogin,
    getAdminUserInfo,
    putStyleImage,
};