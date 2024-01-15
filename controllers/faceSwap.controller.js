async function generateImage(req, res) {

}

async function getAllStylesData(req, res) {
    try{
        const { getAllStylesData } = require("../models/faceSwapStyle.model");
        const result = await getAllStylesData();
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

module.exports = {
    generateImage,
    getAllStylesData,
}