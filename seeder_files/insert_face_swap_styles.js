const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/tavlorify-store";

// Create Face Swap Style Schema

const faceSwapStyleSchema = mongoose.Schema({
    categoryName: String,
    imgSrcList: Array,
    sortNumber: Number,
});

// Create Face Swap Style Model From Face Swap Style Schema

const faceSwapStyleModel = mongoose.model("face_swap_style", faceSwapStyleSchema);

const faceSwapStyleStylesData = [
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/1.jpg",
            "assets/images/styles/faceSwap/Men/V/1.jpg",
            "assets/images/styles/faceSwap/Men/S/1.jpg",
        ],
        sortNumber: 1,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/2.jpg",
            "assets/images/styles/faceSwap/Men/V/2.jpg",
            "assets/images/styles/faceSwap/Men/S/2.jpg",
        ],
        sortNumber: 2,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/3.jpg",
            "assets/images/styles/faceSwap/Men/V/3.jpg",
            "assets/images/styles/faceSwap/Men/S/3.jpg",
        ],
        sortNumber: 3,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/4.jpg",
            "assets/images/styles/faceSwap/Men/V/4.jpg",
            "assets/images/styles/faceSwap/Men/S/4.jpg",
        ],
        sortNumber: 4,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/5.jpg",
            "assets/images/styles/faceSwap/Men/V/5.jpg",
            "assets/images/styles/faceSwap/Men/S/5.jpg",
        ],
        sortNumber: 5,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/6.jpg",
            "assets/images/styles/faceSwap/Men/V/6.jpg",
            "assets/images/styles/faceSwap/Men/S/6.jpg",
        ],
        sortNumber: 6,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/7.jpg",
            "assets/images/styles/faceSwap/Men/V/7.jpg",
            "assets/images/styles/faceSwap/Men/S/7.jpg",
        ],
        sortNumber: 7,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/8.jpg",
            "assets/images/styles/faceSwap/Men/V/8.jpg",
            "assets/images/styles/faceSwap/Men/S/8.jpg",
        ],
        sortNumber: 8,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/9.jpg",
            "assets/images/styles/faceSwap/Men/V/9.jpg",
            "assets/images/styles/faceSwap/Men/S/9.jpg",
        ],
        sortNumber: 9,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/10.jpg",
            "assets/images/styles/faceSwap/Men/V/10.jpg",
            "assets/images/styles/faceSwap/Men/S/10.jpg",
        ],
        sortNumber: 10,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/11.jpg",
            "assets/images/styles/faceSwap/Men/V/11.jpg",
            "assets/images/styles/faceSwap/Men/S/11.jpg",
        ],
        sortNumber: 11,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/12.jpg",
            "assets/images/styles/faceSwap/Men/V/12.jpg",
            "assets/images/styles/faceSwap/Men/S/12.jpg",
        ],
        sortNumber: 12,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/13.jpg",
            "assets/images/styles/faceSwap/Men/V/13.jpg",
            "assets/images/styles/faceSwap/Men/S/13.jpg",
        ],
        sortNumber: 13,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/14.jpg",
            "assets/images/styles/faceSwap/Men/V/14.jpg",
            "assets/images/styles/faceSwap/Men/S/14.jpg",
        ],
        sortNumber: 14,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/15.jpg",
            "assets/images/styles/faceSwap/Men/V/15.jpg",
            "assets/images/styles/faceSwap/Men/S/15.jpg",
        ],
        sortNumber: 15,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/16.jpg",
            "assets/images/styles/faceSwap/Men/V/16.jpg",
            "assets/images/styles/faceSwap/Men/S/16.jpg",
        ],
        sortNumber: 16,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/17.jpg",
            "assets/images/styles/faceSwap/Men/V/17.jpg",
            "assets/images/styles/faceSwap/Men/S/17.jpg",
        ],
        sortNumber: 17,
    },
    {
        categoryName: "men",
        imgSrcList: [
            "assets/images/styles/faceSwap/Men/H/18.jpg",
            "assets/images/styles/faceSwap/Men/V/18.jpg",
            "assets/images/styles/faceSwap/Men/S/18.jpg",
        ],
        sortNumber: 18,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/1.jpg",
            "assets/images/styles/faceSwap/Girls/V/1.jpg",
            "assets/images/styles/faceSwap/Girls/S/1.jpg",
        ],
        sortNumber: 1,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/2.jpg",
            "assets/images/styles/faceSwap/Girls/V/2.jpg",
            "assets/images/styles/faceSwap/Girls/S/2.jpg",
        ],
        sortNumber: 2,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/3.jpg",
            "assets/images/styles/faceSwap/Girls/V/3.jpg",
            "assets/images/styles/faceSwap/Girls/S/3.jpg",
        ],
        sortNumber: 3,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/4.jpg",
            "assets/images/styles/faceSwap/Girls/V/4.jpg",
            "assets/images/styles/faceSwap/Girls/S/4.jpg",
        ],
        sortNumber: 4,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/5.jpg",
            "assets/images/styles/faceSwap/Girls/V/5.jpg",
            "assets/images/styles/faceSwap/Girls/S/5.jpg",
        ],
        sortNumber: 5,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/6.jpg",
            "assets/images/styles/faceSwap/Girls/V/6.jpg",
            "assets/images/styles/faceSwap/Girls/S/6.jpg",
        ],
        sortNumber: 6,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/7.jpg",
            "assets/images/styles/faceSwap/Girls/V/7.jpg",
            "assets/images/styles/faceSwap/Girls/S/7.jpg",
        ],
        sortNumber: 7,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/8.jpg",
            "assets/images/styles/faceSwap/Girls/V/8.jpg",
            "assets/images/styles/faceSwap/Girls/S/8.jpg",
        ],
        sortNumber: 8,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/9.jpg",
            "assets/images/styles/faceSwap/Girls/V/9.jpg",
            "assets/images/styles/faceSwap/Girls/S/9.jpg",
        ],
        sortNumber: 9,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/10.jpg",
            "assets/images/styles/faceSwap/Girls/V/10.jpg",
            "assets/images/styles/faceSwap/Girls/S/10.jpg",
        ],
        sortNumber: 10,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/11.jpg",
            "assets/images/styles/faceSwap/Girls/V/11.jpg",
            "assets/images/styles/faceSwap/Girls/S/11.jpg",
        ],
        sortNumber: 11,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/12.jpg",
            "assets/images/styles/faceSwap/Girls/V/12.jpg",
            "assets/images/styles/faceSwap/Girls/S/12.jpg",
        ],
        sortNumber: 12,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/13.jpg",
            "assets/images/styles/faceSwap/Girls/V/13.jpg",
            "assets/images/styles/faceSwap/Girls/S/13.jpg",
        ],
        sortNumber: 13,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/14.jpg",
            "assets/images/styles/faceSwap/Girls/V/14.jpg",
            "assets/images/styles/faceSwap/Girls/S/14.jpg",
        ],
        sortNumber: 14,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/15.jpg",
            "assets/images/styles/faceSwap/Girls/V/15.jpg",
            "assets/images/styles/faceSwap/Girls/S/15.jpg",
        ],
        sortNumber: 15,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/16.jpg",
            "assets/images/styles/faceSwap/Girls/V/16.jpg",
            "assets/images/styles/faceSwap/Girls/S/16.jpg",
        ],
        sortNumber: 16,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/17.jpg",
            "assets/images/styles/faceSwap/Girls/V/17.jpg",
            "assets/images/styles/faceSwap/Girls/S/17.jpg",
        ],
        sortNumber: 17,
    },
    {
        categoryName: "girls",
        imgSrcList: [
            "assets/images/styles/faceSwap/Girls/H/18.jpg",
            "assets/images/styles/faceSwap/Girls/V/18.jpg",
            "assets/images/styles/faceSwap/Girls/S/18.jpg",
        ],
        sortNumber: 18,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/1.jpg",
            "assets/images/styles/faceSwap/Boys/V/1.jpg",
            "assets/images/styles/faceSwap/Boys/S/1.jpg",
        ],
        sortNumber: 1,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/2.jpg",
            "assets/images/styles/faceSwap/Boys/V/2.jpg",
            "assets/images/styles/faceSwap/Boys/S/2.jpg",
        ],
        sortNumber: 2,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/3.jpg",
            "assets/images/styles/faceSwap/Boys/V/3.jpg",
            "assets/images/styles/faceSwap/Boys/S/3.jpg",
        ],
        sortNumber: 3,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/4.jpg",
            "assets/images/styles/faceSwap/Boys/V/4.jpg",
            "assets/images/styles/faceSwap/Boys/S/4.jpg",
        ],
        sortNumber: 4,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/5.jpg",
            "assets/images/styles/faceSwap/Boys/V/5.jpg",
            "assets/images/styles/faceSwap/Boys/S/5.jpg",
        ],
        sortNumber: 5,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/6.jpg",
            "assets/images/styles/faceSwap/Boys/V/6.jpg",
            "assets/images/styles/faceSwap/Boys/S/6.jpg",
        ],
        sortNumber: 6,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/7.jpg",
            "assets/images/styles/faceSwap/Boys/V/7.jpg",
            "assets/images/styles/faceSwap/Boys/S/7.jpg",
        ],
        sortNumber: 7,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/8.jpg",
            "assets/images/styles/faceSwap/Boys/V/8.jpg",
            "assets/images/styles/faceSwap/Boys/S/8.jpg",
        ],
        sortNumber: 8,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/9.jpg",
            "assets/images/styles/faceSwap/Boys/V/9.jpg",
            "assets/images/styles/faceSwap/Boys/S/9.jpg",
        ],
        sortNumber: 9,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/10.jpg",
            "assets/images/styles/faceSwap/Boys/V/10.jpg",
            "assets/images/styles/faceSwap/Boys/S/10.jpg",
        ],
        sortNumber: 10,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/11.jpg",
            "assets/images/styles/faceSwap/Boys/V/11.jpg",
            "assets/images/styles/faceSwap/Boys/S/11.jpg",
        ],
        sortNumber: 11,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/12.jpg",
            "assets/images/styles/faceSwap/Boys/V/12.jpg",
            "assets/images/styles/faceSwap/Boys/S/12.jpg",
        ],
        sortNumber: 12,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/13.jpg",
            "assets/images/styles/faceSwap/Boys/V/13.jpg",
            "assets/images/styles/faceSwap/Boys/S/13.jpg",
        ],
        sortNumber: 13,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/14.jpg",
            "assets/images/styles/faceSwap/Boys/V/14.jpg",
            "assets/images/styles/faceSwap/Boys/S/14.jpg",
        ],
        sortNumber: 14,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/15.jpg",
            "assets/images/styles/faceSwap/Boys/V/15.jpg",
            "assets/images/styles/faceSwap/Boys/S/15.jpg",
        ],
        sortNumber: 15,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/16.jpg",
            "assets/images/styles/faceSwap/Boys/V/16.jpg",
            "assets/images/styles/faceSwap/Boys/S/16.jpg",
        ],
        sortNumber: 16,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/17.jpg",
            "assets/images/styles/faceSwap/Boys/V/17.jpg",
            "assets/images/styles/faceSwap/Boys/S/17.jpg",
        ],
        sortNumber: 17,
    },
    {
        categoryName: "boys",
        imgSrcList: [
            "assets/images/styles/faceSwap/Boys/H/18.jpg",
            "assets/images/styles/faceSwap/Boys/V/18.jpg",
            "assets/images/styles/faceSwap/Boys/S/18.jpg",
        ],
        sortNumber: 18,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/1.jpg",
            "assets/images/styles/faceSwap/Womans/V/1.jpg",
            "assets/images/styles/faceSwap/Womans/S/1.jpg",
        ],
        sortNumber: 1,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/2.jpg",
            "assets/images/styles/faceSwap/Womans/V/2.jpg",
            "assets/images/styles/faceSwap/Womans/S/2.jpg",
        ],
        sortNumber: 2,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/3.jpg",
            "assets/images/styles/faceSwap/Womans/V/3.jpg",
            "assets/images/styles/faceSwap/Womans/S/3.jpg",
        ],
        sortNumber: 3,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/4.jpg",
            "assets/images/styles/faceSwap/Womans/V/4.jpg",
            "assets/images/styles/faceSwap/Womans/S/4.jpg",
        ],
        sortNumber: 4,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/5.jpg",
            "assets/images/styles/faceSwap/Womans/V/5.jpg",
            "assets/images/styles/faceSwap/Womans/S/5.jpg",
        ],
        sortNumber: 5,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/6.jpg",
            "assets/images/styles/faceSwap/Womans/V/6.jpg",
            "assets/images/styles/faceSwap/Womans/S/6.jpg",
        ],
        sortNumber: 6,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/7.jpg",
            "assets/images/styles/faceSwap/Womans/V/7.jpg",
            "assets/images/styles/faceSwap/Womans/S/7.jpg",
        ],
        sortNumber: 7,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/8.jpg",
            "assets/images/styles/faceSwap/Womans/V/8.jpg",
            "assets/images/styles/faceSwap/Womans/S/8.jpg",
        ],
        sortNumber: 8,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/9.jpg",
            "assets/images/styles/faceSwap/Womans/V/9.jpg",
            "assets/images/styles/faceSwap/Womans/S/9.jpg",
        ],
        sortNumber: 9,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/10.jpg",
            "assets/images/styles/faceSwap/Womans/V/10.jpg",
            "assets/images/styles/faceSwap/Womans/S/10.jpg",
        ],
        sortNumber: 10,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/11.jpg",
            "assets/images/styles/faceSwap/Womans/V/11.jpg",
            "assets/images/styles/faceSwap/Womans/S/11.jpg",
        ],
        sortNumber: 11,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/12.jpg",
            "assets/images/styles/faceSwap/Womans/V/12.jpg",
            "assets/images/styles/faceSwap/Womans/S/12.jpg",
        ],
        sortNumber: 12,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/13.jpg",
            "assets/images/styles/faceSwap/Womans/V/13.jpg",
            "assets/images/styles/faceSwap/Womans/S/13.jpg",
        ],
        sortNumber: 13,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/14.jpg",
            "assets/images/styles/faceSwap/Womans/V/14.jpg",
            "assets/images/styles/faceSwap/Womans/S/14.jpg",
        ],
        sortNumber: 14,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/15.jpg",
            "assets/images/styles/faceSwap/Womans/V/15.jpg",
            "assets/images/styles/faceSwap/Womans/S/15.jpg",
        ],
        sortNumber: 15,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/16.jpg",
            "assets/images/styles/faceSwap/Womans/V/16.jpg",
            "assets/images/styles/faceSwap/Womans/S/16.jpg",
        ],
        sortNumber: 16,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/17.jpg",
            "assets/images/styles/faceSwap/Womans/V/17.jpg",
            "assets/images/styles/faceSwap/Womans/S/17.jpg",
        ],
        sortNumber: 17,
    },
    {
        categoryName: "womans",
        imgSrcList: [
            "assets/images/styles/faceSwap/Womans/H/18.jpg",
            "assets/images/styles/faceSwap/Womans/V/18.jpg",
            "assets/images/styles/faceSwap/Womans/S/18.jpg",
        ],
        sortNumber: 18,
    },
];

async function insert_face_swap_styles_data() {
    try {
        await mongoose.connect(DB_URL);
        await faceSwapStyleModel.insertMany(faceSwapStyleStylesData);
        await mongoose.disconnect();
        return "Ok !!, Inserting Face Swap Styles Data Process Is Successfuly !!";
    } catch (err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

insert_face_swap_styles_data().then((result) => console.log(result));