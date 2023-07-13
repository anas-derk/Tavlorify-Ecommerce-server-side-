function get_all_category_Styles_Data(req, res) {
    let categoryName = req.query.categoryName;
    const { get_all_category_Styles_Data } = require("../models/textToImageStyles.model");
    get_all_category_Styles_Data(categoryName)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

function putStyleData(req, res) {
    let styleId = req.params.styleId;
    let newPrompt = req.body.newPrompt,
        newNegativePrompt = req.body.newNegativePrompt;
    const { updateStyleData } = require("../models/textToImageStyles.model");
    updateStyleData(styleId, newPrompt, newNegativePrompt)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

module.exports = {
    get_all_category_Styles_Data,
    putStyleData
}