const { getResponseObject, checkIsExistValueForFieldsAndDataTypes, isEmail } = require("../global/functions");

const { unlinkSync } = require("fs");

async function getAdminLogin(req, res) {
    try{
        const   email = req.query.email,
                password = req.query.password;
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "email", fieldValue: email, dataType: "string", isRequiredValue: true },
            { fieldName: "password", fieldValue: password, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult.error) {
            await res.status(400).json(checkResult);
            return;
        }
        if (isEmail(email)) {
            const { adminLogin } = require("../models/admin.model");
            const result = await adminLogin(email.toLowerCase(), password);
            if (!result.error) {
                const { sign } = require("jsonwebtoken");
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
            return;
        }
        await res.status(400).json(getResponseObject("Error, This Is Not Email Valid !!", true, {}));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getAdminUserInfo(req, res) {
    try{
        const { getAdminUserInfo } = require("../models/admin.model");
        await res.json(await getAdminUserInfo(req.data._id));
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
        const { updateStyleImagePath } = require("../models/admin.model");
        const result = await updateStyleImagePath(req.query.service, req.query.styleId, req.file.path);
        if (result !== "sorry, this style is not found") {
            unlinkSync(result);
            await res.json("style image process is succesfuly !!");
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