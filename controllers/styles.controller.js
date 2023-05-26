function get_all_category_Styles_Data(req, res) {
    const { get_all_category_Styles_Data } = require("../models/styles.model");
    get_all_category_Styles_Data()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

function putStyleData(req, res) {
    let styleId = req.params.styleId;
    let newPrompt = req.body.newPrompt,
        newNegativePrompt = req.body.newNegativePrompt;
    const { updateStyleData } = require("../models/styles.model");
    updateStyleData(styleId, newPrompt, newNegativePrompt)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

module.exports = {
    get_all_category_Styles_Data,
    putStyleData
}