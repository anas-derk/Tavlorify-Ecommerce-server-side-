const { getResponseObject, isEmail } = require("../global/functions");
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

module.exports = {
    validateJWT,
    validateEmail,
}