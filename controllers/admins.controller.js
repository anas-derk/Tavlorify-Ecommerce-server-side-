const { getResponseObject } = require("../global/functions");

const adminsOPerationsManagmentFunctions = require("../models/admin.model");

const { sign } = require("jsonwebtoken");

const { unlinkSync } = require("fs");

async function getAdminLogin(req, res) {
    try{
        const { email, password } = req.query;
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

module.exports = {
    getAdminLogin,
    getAdminUserInfo,
};