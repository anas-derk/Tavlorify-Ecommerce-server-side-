const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/e-commerce-canvas";

// Create Image To Image Category Schema

const imageToImageCategorySchema = mongoose.Schema({
    imgSrc: String,
    name: String,
});

// Create Image To Image Category Model From Category Schema

const imageToImageCategoryModel = mongoose.model("image-to-image-categorie", imageToImageCategorySchema);

const imageToImageCategoriesData = [
    {
        imgSrc: "assets/images/categories/imageToImage/GlobalArt.png",
        name: "Global art",
    },
    {
        imgSrc: "assets/images/categories/imageToImage/People.png",
        name: "People",
    },
    {
        imgSrc: "assets/images/categories/imageToImage/CharactersKidsAndArt.png",
        name: "characters And Kids art",
    },
    {
        imgSrc: "assets/images/categories/imageToImage/LandscapeAndNature.png",
        name: "Landscape And Nature",
    },
    {
        imgSrc: "assets/images/categories/imageToImage/Cityscapes.png",
        name: "Cityscapes",
    },
    {
        imgSrc: "assets/images/categories/imageToImage/ScandinavianArt.png",
        name: "Scandinavian art",
    },
];

async function insert_image_to_image_categories_data() {
    try {
        await mongoose.connect(DB_URL);
        await imageToImageCategoryModel.insertMany(imageToImageCategoriesData);
        await mongoose.disconnect();
        return "Ok !!, Inserting Categories Data Process Is Successfuly !!";
    } catch (err) {
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

insert_image_to_image_categories_data().then((result) => console.log(result));