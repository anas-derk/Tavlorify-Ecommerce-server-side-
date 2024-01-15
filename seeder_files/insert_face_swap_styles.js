const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/tavlorify-store";

// Create Face Swap Style Schema

const faceSwapStyleSchema = mongoose.Schema({
    imgSrcList: Array,
    sortNumber: Number,
});

// Create Face Swap Style Model From Face Swap Style Schema

const faceSwapStyleModel = mongoose.model("face_swap_style", faceSwapStyleSchema);

const faceSwapStyleStylesData = [
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/1v.jpg",
            "assets/images/styles/faceSwap/1h.jpg",
            "assets/images/styles/faceSwap/1s.jpg",
        ],
        sortNumber: 1,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/2v.jpg",
            "assets/images/styles/faceSwap/2h.jpg",
            "assets/images/styles/faceSwap/2s.jpg",
        ],
        sortNumber: 2,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/3v.jpg",
            "assets/images/styles/faceSwap/3h.jpg",
            "assets/images/styles/faceSwap/3s.jpg",
        ],
        sortNumber: 3,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/4v.jpg",
            "assets/images/styles/faceSwap/4h.jpg",
            "assets/images/styles/faceSwap/4s.jpg",
        ],
        sortNumber: 4,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/5v.jpg",
            "assets/images/styles/faceSwap/5h.jpg",
            "assets/images/styles/faceSwap/5s.jpg",
        ],
        sortNumber: 5,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/6v.jpg",
            "assets/images/styles/faceSwap/6h.jpg",
            "assets/images/styles/faceSwap/6s.jpg",
        ],
        sortNumber: 6,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/7v.jpg",
            "assets/images/styles/faceSwap/7h.jpg",
            "assets/images/styles/faceSwap/7s.jpg",
        ],
        sortNumber: 7,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/8v.jpg",
            "assets/images/styles/faceSwap/8h.jpg",
            "assets/images/styles/faceSwap/8s.jpg",
        ],
        sortNumber: 8,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/9v.jpg",
            "assets/images/styles/faceSwap/9h.jpg",
            "assets/images/styles/faceSwap/9s.jpg",
        ],
        sortNumber: 9,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/10v.jpg",
            "assets/images/styles/faceSwap/10h.jpg",
            "assets/images/styles/faceSwap/10s.jpg",
        ],
        sortNumber: 10,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/11v.jpg",
            "assets/images/styles/faceSwap/11h.jpg",
            "assets/images/styles/faceSwap/11s.jpg",
        ],
        sortNumber: 11,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/12v.jpg",
            "assets/images/styles/faceSwap/12h.jpg",
            "assets/images/styles/faceSwap/12s.jpg",
        ],
        sortNumber: 12,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/13v.jpg",
            "assets/images/styles/faceSwap/13h.jpg",
            "assets/images/styles/faceSwap/13s.jpg",
        ],
        sortNumber: 13,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/14v.jpg",
            "assets/images/styles/faceSwap/14h.jpg",
            "assets/images/styles/faceSwap/14s.jpg",
        ],
        sortNumber: 14,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/15v.jpg",
            "assets/images/styles/faceSwap/15h.jpg",
            "assets/images/styles/faceSwap/15s.jpg",
        ],
        sortNumber: 15,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/16v.jpg",
            "assets/images/styles/faceSwap/16h.jpg",
            "assets/images/styles/faceSwap/16s.jpg",
        ],
        sortNumber: 16,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/17v.jpg",
            "assets/images/styles/faceSwap/17h.jpg",
            "assets/images/styles/faceSwap/17s.jpg",
        ],
        sortNumber: 17,
    },
    {
        imgSrcList: [
            "assets/images/styles/faceSwap/18v.jpg",
            "assets/images/styles/faceSwap/18h.jpg",
            "assets/images/styles/faceSwap/18s.jpg",
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