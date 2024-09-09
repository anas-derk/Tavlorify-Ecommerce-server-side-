const { join } = require("path");

const { readFileSync } = require("fs");

const { compile } = require("ejs");

const { createTransport } = require("nodemailer");

const { Types } = require("mongoose");

const { get } = require("axios");

const sharp = require("sharp");

const { saveNewGeneratedImageData } = require("../models/generatedImages.model");

function isEmail(email) {
    return email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
}

function isValidPassword(password) {
    return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
}

function isValidName(name) {
    return name.match(/^([\u0600-\u06FF\s]+|[a-zA-Z\s]+)$/);
}

function getResponseObject(msg, isError, data) {
    return {
        msg,
        error: isError,
        data,
    }
}

function calcOrderAmount(order_lines) {
    let newOrderAmount = 0;
    for (let i = 0; i < order_lines.length; i++) {
        newOrderAmount += order_lines[i].total_amount;
    }
    return newOrderAmount;
}

async function saveNewGeneratedImage(generatedImageURL) {
    const randomImageName = `${Math.random()}_${Date.now()}__generatedImage.png`;
    const destination = join(__dirname, "..", "assets", "images", "generatedImages", randomImageName);
    const res = await get(generatedImageURL, { responseType: 'arraybuffer' });
    const result = res.data;
    await sharp(result).toFile(destination);
    return {
        msg: "Success File Downloaded Process Has Been Successfully !!",
        error: false,
        data: {
            imagePath: `assets/images/generatedImages/${randomImageName}`,
            imageAsArrayBuffer: result,
        }
    };
}

async function saveNewGeneratedImageDataGlobalFunc(generatingInfo, generatedImageAsArrayBuffer) {
    try{
        console.log(generatingInfo)
        const { width, height } = await sharp(generatedImageAsArrayBuffer).metadata();
        if (generatingInfo.service === "image-to-image") {
            let imageOrientation = "", size = "";
            if (width < height) {
                imageOrientation = "vertical";
                size = "50x70";
            }
            else if (width > height) {
                imageOrientation = "horizontal";
                size = "70x50";
            }
            else {
                imageOrientation = "square";
                size = "30x30";
            }
            await saveNewGeneratedImageData({
                service: generatingInfo.service,
                uploadedImageURL: generatingInfo.imageLink,
                categoryName: generatingInfo.categoryName,
                styleName: generatingInfo.styleName,
                paintingType: generatingInfo.paintingType,
                position: imageOrientation,
                size: size,
                isExistWhiteBorder: generatingInfo.isExistWhiteBorder,
                width: width,
                height: height,
                frameColor: generatingInfo.frameColor,
                generatedImagePath: generatingInfo.generatedImageURL,
            });
        } else if (generatingInfo.service === "text-to-image") {
            console.log(generatingInfo)
            await saveNewGeneratedImageData({
                service: generatingInfo.service,
                textPrompt: generatingInfo.textPrompt,
                categoryName: generatingInfo.categoryName,
                styleName: generatingInfo.styleName,
                paintingType: generatingInfo.paintingType,
                position: generatingInfo.position,
                size: generatingInfo.dimentionsInCm,
                isExistWhiteBorder: generatingInfo.isExistWhiteBorder,
                width: width,
                height: height,
                frameColor: generatingInfo.frameColor,
                generatedImagePath: generatingInfo.generatedImageURL,
            });
        }
    }
    catch(err) {
        console.log(err)
        throw err;
    }
}

function transporterObj() {
    const transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        requireTLS: true,
        auth: {
            user: process.env.BUSSINESS_EMAIL,
            pass: process.env.BUSSINESS_PASSWORD,
        }
    });
    return transporter;
}

function sendPaymentConfirmationMessage(email, orderDetails) {
    const templateContent =  readFileSync(join(__dirname, "..", "assets", "email_template.ejs"), "utf-8");
    const compiledTemplate = compile(templateContent);
    const htmlContentAfterCompilingEjsTemplateFile = compiledTemplate(orderDetails);
    // إعداد الرسالة قبل إرسالها
    const mailConfigurations = {
        from: "info@tavlorify.se",
        to: email,
        subject: "Payment Confirmation On Tavlorify Store",
        html: htmlContentAfterCompilingEjsTemplateFile,
    };
    return new Promise((resolve, reject) => {
        // إرسال رسالة الكود إلى الإيميل
        transporterObj().sendMail(mailConfigurations, function (error, info) {
            // في حالة حدث خطأ في الإرسال أرجع خطأ
            if (error) reject(error);
            // في حالة لم يحدث خطأ أعد الكود المولد
            resolve("");
        });
    });
}

function checkIsExistValueForFieldsAndDataTypes(fieldNamesAndValuesAndDataTypes) {
    for (let fieldnameAndValueAndDataType of fieldNamesAndValuesAndDataTypes) {
        if (fieldnameAndValueAndDataType.isRequiredValue) {
            if (!fieldnameAndValueAndDataType.fieldValue && fieldnameAndValueAndDataType.dataType !== "number") 
                return getResponseObject(
                    `Invalid Request, Please Send ${fieldnameAndValueAndDataType.fieldName} Value !!`,
                    true,
                    {}
                );
        }
        if (fieldnameAndValueAndDataType.fieldValue) {
            if (fieldnameAndValueAndDataType.dataType === "number" && isNaN(fieldnameAndValueAndDataType.fieldValue)) {
                return getResponseObject(
                    `Invalid Request, Please Fix Type Of ${fieldnameAndValueAndDataType.fieldName} ( Required: ${fieldnameAndValueAndDataType.dataType} ) !!`,
                    true,
                    {}
                );
            } 
            if (fieldnameAndValueAndDataType.dataType === "ObjectId" && !Types.ObjectId.isValid(fieldnameAndValueAndDataType.fieldValue))  {
                return getResponseObject(
                    `Invalid Request, Please Fix Type Of ${fieldnameAndValueAndDataType.fieldName} ( Required: ${fieldnameAndValueAndDataType.dataType} ) !!`,
                    true,
                    {}
                );
            }
            if (typeof fieldnameAndValueAndDataType.fieldValue !== fieldnameAndValueAndDataType.dataType && fieldnameAndValueAndDataType.dataType !== "ObjectId")
                return getResponseObject(
                    `Invalid Request, Please Fix Type Of ${fieldnameAndValueAndDataType.fieldName} ( Required: ${fieldnameAndValueAndDataType.dataType} ) !!`,
                    true,
                    {}
                );
        }
    }
    return getResponseObject("Success In Check Is Exist Value For Fields And Data Types !!", false, {});
}

function validateIsExistValueForFieldsAndDataTypes(fieldsDetails, res, nextFunc) {
    const checkResult = checkIsExistValueForFieldsAndDataTypes(fieldsDetails);
    if (checkResult.error) {
        res.status(400).json(checkResult);
        return;
    }
    nextFunc();
}

module.exports = {
    isEmail,
    isValidPassword,
    isValidName,
    getResponseObject,
    checkIsExistValueForFieldsAndDataTypes,
    calcOrderAmount,
    saveNewGeneratedImage,
    saveNewGeneratedImageDataGlobalFunc,
    sendPaymentConfirmationMessage,
    validateIsExistValueForFieldsAndDataTypes,
}