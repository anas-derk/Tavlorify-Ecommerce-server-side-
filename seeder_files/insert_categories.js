const mongoose = require("mongoose");

require("dotenv").config({
    path: "../.env",
});

// Create Category Schema

const categorySchema = mongoose.Schema({
    service: {
        type: String,
        required: true,
        enum: ["text-to-image", "image-to-image"]
    },
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

// Create Category Model From Category Schema

const categoryModel = mongoose.model("categorie", categorySchema);

const categoriesData = [
    {
        service: "text-to-image",
        imgSrc: "assets/images/categories/textToImage/ART.jpg",
        name: "Art",
        sortNumber: 1,
    },
    {
        service: "text-to-image",
        imgSrc: "assets/images/categories/textToImage/Animals.jpg",
        name: "Animals",
        sortNumber: 2,
    },
    {
        service: "text-to-image",
        imgSrc: "assets/images/categories/textToImage/photography.jpg",
        name: "Photography",
        sortNumber: 3,
    },
    {
        service: "text-to-image",
        imgSrc: "assets/images/categories/textToImage/People.jpg",
        name: "People",
        sortNumber: 4,
    },
    {
        service: "text-to-image",
        imgSrc: "assets/images/categories/textToImage/LandscapeAndNature.jpg",
        name: "Landscape And Nature",
        sortNumber: 5,
    },
    {
        service: "text-to-image",
        imgSrc: "assets/images/categories/textToImage/Vehicles.jpg",
        name: "Vehicles",
        sortNumber: 6,
    },
    {
        service: "text-to-image",
        imgSrc: "assets/images/categories/textToImage/characters_Anime.jpg",
        name: "characters And Anime",
        sortNumber: 7,
    },
    {
        service: "text-to-image",
        imgSrc: "assets/images/categories/textToImage/Cityscapes.jpg",
        name: "Cityscapes",
        sortNumber: 8,
    },
    {
        service: "image-to-image",
        imgSrc: "assets/images/categories/imageToImage/GlobalArt.jpg",
        name: "Global art",
        sortNumber: 1,
    },
    {
        service: "image-to-image",
        imgSrc: "assets/images/categories/imageToImage/People.jpg",
        name: "People",
        sortNumber: 2,
    },
    {
        service: "image-to-image",
        imgSrc: "assets/images/categories/imageToImage/CharactersKidsAndArt.jpg",
        name: "characters And Kids art",
        sortNumber: 3,
    },
    {
        service: "image-to-image",
        imgSrc: "assets/images/categories/imageToImage/LandscapeAndNature.jpg",
        name: "Landscape And Nature",
        sortNumber: 4,
    },
    {
        service: "image-to-image",
        imgSrc: "assets/images/categories/imageToImage/Cityscapes.jpg",
        name: "Cityscapes",
        sortNumber: 5,
    },
    {
        service: "image-to-image",
        imgSrc: "assets/images/categories/imageToImage/ScandinavianArt.jpg",
        name: "Scandinavian art",
        sortNumber: 6,
    },
];

async function insertCategoriesData() {
    try {
        await mongoose.connect(process.env.DB_URL);
        await categoryModel.insertMany(categoriesData);
        await mongoose.disconnect();
        return "Ok !!, Inserting Image To Image Categories Data Process Is Successfuly !!";
    } catch (err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

insertCategoriesData().then((result) => console.log(result));