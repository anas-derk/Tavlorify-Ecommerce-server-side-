const { getResponseObject } = require("../global/functions");

function validatePaintingType(paintingType, res, nextFunc) {
    if (!["canvas", "poster", "poster-with-wooden-frame", "poster-with-hangers",].includes(paintingType)) {
        return res.status(400).json(getResponseObject("Sorry, Please Send Valid Painting Type !!", true, {}));
    }
    nextFunc();
}

function validateIsExistWhiteBorder(isExistWhiteBorder, res, nextFunc) {
    if (!["without-border", "with-border"].includes(isExistWhiteBorder)) {
        return res.status(400).json(getResponseObject("Sorry, Please Send Valid Painting Type !!", true, {}));
    }
    nextFunc();
}

function validatePosition(position, res, nextFunc) {
    if (!["vertical", "horizontal", "square"].includes(position)) {
        return res.status(400).json(getResponseObject("Sorry, Please Send Valid Painting Type !!", true, {}));
    }
    nextFunc();
}

function validateSize(position, size, res, nextFunc) {
    const sizesByPosition = {
        "vertical": ["21x30", "30x40", "50x70", "70x100"],
        "horizontal": ["30x21", "40x30", "70x50", "100x70"],
        "square": ["30x30", "50x50", "70x70"],
    }
    if (!sizesByPosition[position].includes(size)) {
        return res.status(400).json(getResponseObject("Sorry, Please Send Valid Size !!", true, {}));
    }
    nextFunc();
}

function validateFrameColor(frameColor, res, nextFunc) {
    if (!["white", "black", "natural-wood", "dark-wood", "none"].includes(frameColor)) {
        return res.status(400).json(getResponseObject("Sorry, Please Send Valid Frame Color !!", true, {}));
    }
    nextFunc();
}

module.exports = {
    validatePaintingType,
    validateIsExistWhiteBorder,
    validatePosition,
    validateSize,
    validateFrameColor
}