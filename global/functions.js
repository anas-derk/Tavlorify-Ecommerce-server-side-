function isEmail(email) {
    return email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
}

function calcOrderAmount(order_lines) {
    let newOrderAmount = 0;
    for (let i = 0; i < order_lines.length; i++) {
        newOrderAmount += order_lines[i].total_amount;
    }
    return newOrderAmount;
}

async function saveNewGeneratedImage(generatedImageURL) {
    const { get } = require('axios');
    const randomImageName = `${Math.random()}_${Date.now()}__generatedImage.png`;
    const path = require("path");
    const destination = path.join(__dirname, "..", "assets", "images", "generatedImages", randomImageName);
    const res = await get(generatedImageURL, { responseType: 'arraybuffer' });
    const result = await res.data;
    const sharp = require("sharp");
    await sharp(result).toFile(destination);
    return { msg: "success file downloaded !!", imagePath: `assets/images/generatedImages/${randomImageName}`, imageAsArrayBuffer: result };
}

async function saveNewGeneratedImageDataGlobalFunc(generatingInfo, generatedImageAsArrayBuffer) {
    try{
        const sharp = require("sharp");
        const { width, height } = await sharp(generatedImageAsArrayBuffer).metadata();
        const { saveNewGeneratedImageData } = require("../models/generatedImages.model");
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
        console.log(err);
    }
}

function transporterObj() {
    const nodemailer = require('nodemailer');
    // إنشاء ناقل بيانات لسيرفر SMTP مع إعداده 
    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        requireTLS: true,
        auth: {
            user: "info@tavlorify.se",
            pass: "Tavlorify-1571",
        }
    });
    return transporter;
}

const { join } = require("path");
const { readFileSync } = require("fs");
const { compile } = require("ejs");

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

module.exports = {
    isEmail,
    calcOrderAmount,
    saveNewGeneratedImage,
    saveNewGeneratedImageDataGlobalFunc,
    sendPaymentConfirmationMessage,
}