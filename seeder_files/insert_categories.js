const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/e-commerce-canvas";

// Create Category Schema

const categorySchema = mongoose.Schema({
    imgSrc: String,
    name: String,
});

// Create Category Model From Category Schema

const categoryModel = mongoose.model("categorie", categorySchema);

const categoriesData = [
    {
        imgSrc: "assets/images/categories/ART.png",
        name: "Art",
    },
    {
        imgSrc: "assets/images/categories/Animals.png",
        name: "Animals",
    },
    {
        imgSrc: "assets/images/categories/photography.png",
        name: "Photography",
    },
    {
        imgSrc: "assets/images/categories/People.png",
        name: "People",
    },
    {
        imgSrc: "assets/images/categories/LandscapeAndNature.png",
        name: "Landscape And Nature",
    },
    {
        imgSrc: "assets/images/categories/Vehicles.png",
        name: "Vehicles",
    },
    {
        imgSrc: "assets/images/categories/characters_Anime.png",
        name: "characters And Anime",
    },
    {
        imgSrc: "assets/images/categories/Cityscapes.png",
        name: "Cityscapes",
    }
];

async function insert_categories_data() {
    try {
        await mongoose.connect(DB_URL);
        await categoryModel.insertMany(categoriesData);
        await mongoose.disconnect();
        return "Ok !!, Inserting Categories Data Process Is Successfuly !!";
    } catch (err) {
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

insert_categories_data().then((result) => console.log(result));