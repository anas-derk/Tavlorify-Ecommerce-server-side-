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

function validateIsExistErrorInFiles(req, res, next) {
    const uploadError = req.uploadError;
    if (uploadError) {
        res.status(400).json(getResponseObject(uploadError, true, {}));
        return;
    }
    next();
}

function validateEmail(email, res, nextFunc) {
    if (!isEmail(email)) {
        res.status(400).json(getResponseObject("Sorry, Please Send Valid Email !!", true, {}));
        return;
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

function validateServiceName(service, res, nextFunc) {
    if (!["text-to-image", "image-to-image", "face-swap"].includes(service)) {
        return res.status(400).json(getResponseObject("Sorry, Service Name Uncorrect Or Not Found !!", true, {}));
    }
    nextFunc();
}

function validateNumbersIsPositive(numbers, res, nextFunc, errorMsgs, defaultMsg = "Sorry, Please Send Valid Number ( Number Must Be Greater Than Zero ) !!") {
    for(let i = 0; i < numbers.length; i++) {
        if (numbers[i] < 0) {
            res.status(400).json(getResponseObject(errorMsgs[i] ? errorMsgs[i] : defaultMsg, true, {}));
            return;
        }
    }
    nextFunc();
}

function validateNumbersIsNotFloat(numbers, res, nextFunc, errorMsgs, defaultMsg = "Sorry, Please Send Valid Number ( Number Must Be Not Float ) !!") {
    for(let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 1 !== 0) {
            res.status(400).json(getResponseObject(errorMsgs[i] ? errorMsgs[i] : defaultMsg, true, {}));
            return;
        }
    }
    nextFunc();
}

function validateOrdersType(ordersType, res, nextFunc) {
    if (!["normal", "returned"].includes(ordersType)) {
        return res.status(400).json(getResponseObject("Sorry, Please Send Valid Order Type ( 'order' Or 'returned'  ) !!", true, {}));
    }
    nextFunc();
}

module.exports = {
    validateJWT,
    validateIsExistErrorInFiles,
    validateEmail,
    validatePassword,
    validateServiceName,
    validateNumbersIsPositive,
    validateNumbersIsNotFloat,
    validateOrdersType
}