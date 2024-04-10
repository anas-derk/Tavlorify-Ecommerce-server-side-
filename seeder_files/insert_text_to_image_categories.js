const mongoose = require("mongoose");

require("dotenv").config({
    path: "../.env",
});

// Create Text To Image Category Schema

const textToImageCategorySchema = mongoose.Schema({
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

// Create Text To Image Category Model From Category Schema

const textToImageCategoryModel = mongoose.model("text_to_image_categorie", textToImageCategorySchema);

const textToImageCategoriesData = [
    {
        imgSrc: "assets/images/categories/textToImage/ART.jpg",
        name: "Art",
        sortNumber: 1,
    },
    {
        imgSrc: "assets/images/categories/textToImage/Animals.jpg",
        name: "Animals",
        sortNumber: 2,
    },
    {
        imgSrc: "assets/images/categories/textToImage/photography.jpg",
        name: "Photography",
        sortNumber: 3,
    },
    {
        imgSrc: "assets/images/categories/textToImage/People.jpg",
        name: "People",
        sortNumber: 4,
    },
    {
        imgSrc: "assets/images/categories/textToImage/LandscapeAndNature.jpg",
        name: "Landscape And Nature",
        sortNumber: 5,
    },
    {
        imgSrc: "assets/images/categories/textToImage/Vehicles.jpg",
        name: "Vehicles",
        sortNumber: 6,
    },
    {
        imgSrc: "assets/images/categories/textToImage/characters_Anime.jpg",
        name: "characters And Anime",
        sortNumber: 7,
    },
    {
        imgSrc: "assets/images/categories/textToImage/Cityscapes.jpg",
        name: "Cityscapes",
        sortNumber: 8,
    }
];

async function insert_text_to_image_categories_data() {
    try {
        await mongoose.connect(process.env.DB_URL);
        await textToImageCategoryModel.insertMany(textToImageCategoriesData);
        await mongoose.disconnect();
        return "Ok !!, Inserting Text To Image Categories Data Process Is Successfuly !!";
    } catch (err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

insert_text_to_image_categories_data().then((result) => console.log(result));