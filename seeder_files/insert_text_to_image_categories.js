const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/tavlorify-store";

// Create Text To Image Category Schema

const textToImageCategorySchema = mongoose.Schema({
    imgSrc: String,
    name: String,
    sortNumber: Number,
});

// Create Text To Image Category Model From Category Schema

const textToImageCategoryModel = mongoose.model("text_to_image_categorie", textToImageCategorySchema);

const textToImageCategoriesData = [
    {
        imgSrc: "assets/images/categories/textToImage/ART.png",
        name: "Art",
        sortNumber: 1,
    },
    {
        imgSrc: "assets/images/categories/textToImage/Animals.png",
        name: "Animals",
        sortNumber: 2,
    },
    {
        imgSrc: "assets/images/categories/textToImage/photography.png",
        name: "Photography",
        sortNumber: 3,
    },
    {
        imgSrc: "assets/images/categories/textToImage/People.png",
        name: "People",
        sortNumber: 4,
    },
    {
        imgSrc: "assets/images/categories/textToImage/LandscapeAndNature.png",
        name: "Landscape And Nature",
        sortNumber: 5,
    },
    {
        imgSrc: "assets/images/categories/textToImage/Vehicles.png",
        name: "Vehicles",
        sortNumber: 6,
    },
    {
        imgSrc: "assets/images/categories/textToImage/characters_Anime.png",
        name: "characters And Anime",
        sortNumber: 7,
    },
    {
        imgSrc: "assets/images/categories/textToImage/Cityscapes.png",
        name: "Cityscapes",
        sortNumber: 8,
    }
];

async function insert_text_to_image_categories_data() {
    try {
        await mongoose.connect(DB_URL);
        await textToImageCategoryModel.insertMany(textToImageCategoriesData);
        await mongoose.disconnect();
        return "Ok !!, Inserting Text To Image Categories Data Process Is Successfuly !!";
    } catch (err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

insert_text_to_image_categories_data().then((result) => console.log(result));