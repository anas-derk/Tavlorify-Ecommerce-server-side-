const stylesRouter = require("express").Router();

const stylesController = require("../controllers/textToImageStyles.controller");

stylesRouter.get("/category-styles-data", stylesController.get_all_category_Styles_Data);

stylesRouter.put("/update-style-data/:styleId", stylesController.putStyleData);

module.exports = stylesRouter;