const { getResponseObject, isEmail, isValidPassword } = require("../global/functions");
const { verify } = require("jsonwebtoken");

function validateJWT(req, res, next) {
    const token = req.headers.authorization;
    verify(token, process.env.secretKey, async (err, decode) => {
        if (err) {
            return res.status(401).json(getResponseObject("Unauthorized Error", true, {}));
        }
        req.data = decode;
        next();
    });
}

function validateIsExistErrorInFiles(req, res, next) {
    const uploadError = req.uploadError;
    if (uploadError) {
        return res.status(400).json(getResponseObject(uploadError, true, {}));
    }
    next();
}

function validateEmail(email, res, nextFunc) {
    if (!isEmail(email)) {
        return res.status(400).json(getResponseObject("Sorry, Please Send Valid Email !!", true, {}));
    }
    nextFunc();
}

function validatePassword(password, res, nextFunc, errorMsg = "Sorry, Please Send Valid Password !!") {
    if (!isValidPassword(password)) {
        return res.status(400).json(getResponseObject(errorMsg, true, {}));
    }
    nextFunc();
}

function validateServiceName(service, res, nextFunc) {
    if (!["text-to-image", "image-to-image", "face-swap"].includes(service)) {
        return res.status(400).json(getResponseObject("Sorry, Service Name Uncorrect Or Not Found !!", true, {}));
    }
    nextFunc();
}

function validateNumbersIsGreaterThanZero(numbers, res, nextFunc, errorMsgs, defaultMsg = "Sorry, Please Send Valid Number ( Number Must Be Greater Than Zero ) !!") {
    for(let i = 0; i < numbers.length; i++) {
        if (numbers[i] < 0) {
            return res.status(400).json(getResponseObject(errorMsgs[i] ? errorMsgs[i] : defaultMsg, true, {}));
        }
    }
    nextFunc();
}

function validateNumbersIsNotFloat(numbers, res, nextFunc, errorMsgs, defaultMsg = "Sorry, Please Send Valid Number ( Number Must Be Not Float ) !!") {
    for(let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 1 !== 0) {
            return res.status(400).json(getResponseObject(errorMsgs[i] ? errorMsgs[i] : defaultMsg, true, {}));
        }
    }
    nextFunc();
}

function validateOrdersType(ordersType, res, nextFunc) {
    if (!["normal", "returned"].includes(ordersType)) {
        return res.status(400).json(getResponseObject("Sorry, Please Send Valid Order Type ( 'normal' Or 'returned'  ) !!", true, {}));
    }
    nextFunc();
}

function validateImageIndexForFaceSwap(imageIndex, res, nextFunc) {
    if (![0, 1, 2].includes(Number(imageIndex))) {
        return res.status(400).json(getResponseObject("Sorry, Please Send Valid Image Index ( '0' For Vertical Image, '1' For Horizontal Image, '2' For Square Image ) !!", true, {}));
    }
    nextFunc();
}

module.exports = {
    validateJWT,
    validateIsExistErrorInFiles,
    validateEmail,
    validatePassword,
    validateServiceName,
    validateNumbersIsGreaterThanZero,
    validateNumbersIsNotFloat,
    validateOrdersType,
    validateImageIndexForFaceSwap
}