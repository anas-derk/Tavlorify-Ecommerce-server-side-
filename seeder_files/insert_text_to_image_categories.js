const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/e-commerce-canvas";

// Create Text To Image Category Schema

const textToImageCategorySchema = mongoose.Schema({
    imgSrc: String,
    name: String,
});

// Create Text To Image Category Model From Category Schema

const textToImageCategoryModel = mongoose.model("text-to-image-categorie", textToImageCategorySchema);

const textToImageCategoriesData = [
    {
        imgSrc: "assets/images/categories/textToImage/ART.png",
        name: "Art",
    },
    {
        imgSrc: "assets/images/categories/textToImage/Animals.png",
        name: "Animals",
    },
    {
        imgSrc: "assets/images/categories/textToImage/photography.png",
        name: "Photography",
    },
    {
        imgSrc: "assets/images/categories/textToImage/People.png",
        name: "People",
    },
    {
        imgSrc: "assets/images/categories/textToImage/LandscapeAndNature.png",
        name: "Landscape And Nature",
    },
    {
        imgSrc: "assets/images/categories/textToImage/Vehicles.png",
        name: "Vehicles",
    },
    {
        imgSrc: "assets/images/categories/textToImage/characters_Anime.png",
        name: "characters And Anime",
    },
    {
        imgSrc: "assets/images/categories/textToImage/Cityscapes.png",
        name: "Cityscapes",
    }
];

async function insert_text_to_image_categories_data() {
    try {
        await mongoose.connect(DB_URL);
        await textToImageCategoryModel.insertMany(textToImageCategoriesData);
        await mongoose.disconnect();
        return "Ok !!, Inserting Categories Data Process Is Successfuly !!";
    } catch (err) {
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

insert_text_to_image_categories_data().then((result) => console.log(result));