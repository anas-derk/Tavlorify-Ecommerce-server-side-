async function postImageAfterCroping(req, res) {
    try {
        const cropingDetails = req.body;
        const sharp = require("sharp");
        const imagePath = `assets/images/cropedImages/cropedImage${Math.random()}_${Date.now()}__.png`;
        const imageBuffer = sharp(cropingDetails.imagePath);
        const { width, height } = await imageBuffer.metadata();
        if (width < height) {
            await imageBuffer.resize({ fit: "cover", width: cropingDetails.width, height: null })
                .extract({ width: cropingDetails.width, height: cropingDetails.height, left: cropingDetails.left, top: cropingDetails.top })
                .toFile(imagePath);
        } else if (width > height) {
            await imageBuffer.resize({ fit: "cover", width: null, height: cropingDetails.height })
                .extract({ width: cropingDetails.width, height: cropingDetails.height, left: cropingDetails.left, top: cropingDetails.top })
                .toFile(imagePath);
        }
        await res.json(imagePath);
    }
    catch (err) {
        await res.status(500).json(err);
    }
}

module.exports = {
    postImageAfterCroping,
}