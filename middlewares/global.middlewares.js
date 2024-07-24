const { getResponseObject, isEmail, isValidPassword } = require("../global/functions");
const { verify } = require("jsonwebtoken");

function validateJWT(req, res, next) {
    const token = req.headers.authorization;
    verify(token, process.env.secretKey, async (err, decode) => {
        if (err) {
            await res.status(401).json(getResponseObject("Unauthorized Error", true, {}));
            return;
        }
        req.data = decode;
        next();
    });
}

function validateEmail(email, res, nextFunc) {
    if (!isEmail(email)) {
        res.status(400).json(getResponseObject("Sorry, Please Send Valid Email !!", true, {}));
        return;
    }
    nextFunc();
}

function validateServiceName(service, res, nextFunc) {
    if (service !== "text-to-image" && service !== "image-to-image") {
        return res.status(400).json(getResponseObject("Sorry, Service Name Uncorrect Or Not Found !!", true, {}));
    }
    nextFunc();
}

function validatePassword(password, res, nextFunc, errorMsg = "Sorry, Please Send Valid Password !!") {
    if (!isValidPassword(password)) {
        res.status(400).json(getResponseObject(errorMsg, true, {}));
        return;
    }
    nextFunc();
}

module.exports = {
    validateJWT,
    validateEmail,
    validatePassword,
    validateServiceName
}