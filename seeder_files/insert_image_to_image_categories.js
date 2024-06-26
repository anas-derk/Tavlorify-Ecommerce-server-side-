const mongoose = require("mongoose");

require("dotenv").config({
    path: "../.env",
});

// Create Image To Image Category Schema

const imageToImageCategorySchema = mongoose.Schema({
    imgSrc: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    sortNumber: Number,
});

// Create Image To Image Category Model From Category Schema

const imageToImageCategoryModel = mongoose.model("image_to_image_categorie", imageToImageCategorySchema);

const imageToImageCategoriesData = [
    {
        imgSrc: "assets/images/categories/imageToImage/GlobalArt.jpg",
        name: "Global art",
        sortNumber: 1,
    },
    {
        imgSrc: "assets/images/categories/imageToImage/People.jpg",
        name: "People",
        sortNumber: 2,
    },
    {
        imgSrc: "assets/images/categories/imageToImage/CharactersKidsAndArt.jpg",
        name: "characters And Kids art",
        sortNumber: 3,
    },
    {
        imgSrc: "assets/images/categories/imageToImage/LandscapeAndNature.jpg",
        name: "Landscape And Nature",
        sortNumber: 4,
    },
    {
        imgSrc: "assets/images/categories/imageToImage/Cityscapes.jpg",
        name: "Cityscapes",
        sortNumber: 5,
    },
    {
        imgSrc: "assets/images/categories/imageToImage/ScandinavianArt.jpg",
        name: "Scandinavian art",
        sortNumber: 6,
    },
];

async function insert_image_to_image_categories_data() {
    try {
        await mongoose.connect(process.env.DB_URL);
        await imageToImageCategoryModel.insertMany(imageToImageCategoriesData);
        await mongoose.disconnect();
        return "Ok !!, Inserting Image To Image Categories Data Process Is Successfuly !!";
    } catch (err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

insert_image_to_image_categories_data().then((result) => console.log(result));