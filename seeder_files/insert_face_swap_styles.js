const mongoose = require("mongoose");

require("dotenv").config({
    path: "../.env",
});

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
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/1.jpg",
            "assets/images/styles/faceSwap/Man/H/1.jpg",
            "assets/images/styles/faceSwap/Man/S/1.jpg",
        ],
        sortNumber: 1,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/2.jpg",
            "assets/images/styles/faceSwap/Man/H/2.jpg",
            "assets/images/styles/faceSwap/Man/S/2.jpg",
        ],
        sortNumber: 2,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/3.jpg",
            "assets/images/styles/faceSwap/Man/H/3.jpg",
            "assets/images/styles/faceSwap/Man/S/3.jpg",
        ],
        sortNumber: 3,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/4.jpg",
            "assets/images/styles/faceSwap/Man/H/4.jpg",
            "assets/images/styles/faceSwap/Man/S/4.jpg",
        ],
        sortNumber: 4,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/5.jpg",
            "assets/images/styles/faceSwap/Man/H/5.jpg",
            "assets/images/styles/faceSwap/Man/S/5.jpg",
        ],
        sortNumber: 5,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/6.jpg",
            "assets/images/styles/faceSwap/Man/H/6.jpg",
            "assets/images/styles/faceSwap/Man/S/6.jpg",
        ],
        sortNumber: 6,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/7.jpg",
            "assets/images/styles/faceSwap/Man/H/7.jpg",
            "assets/images/styles/faceSwap/Man/S/7.jpg",
        ],
        sortNumber: 7,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/8.jpg",
            "assets/images/styles/faceSwap/Man/H/8.jpg",
            "assets/images/styles/faceSwap/Man/S/8.jpg",
        ],
        sortNumber: 8,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/9.jpg",
            "assets/images/styles/faceSwap/Man/H/9.jpg",
            "assets/images/styles/faceSwap/Man/S/9.jpg",
        ],
        sortNumber: 9,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/10.jpg",
            "assets/images/styles/faceSwap/Man/H/10.jpg",
            "assets/images/styles/faceSwap/Man/S/10.jpg",
        ],
        sortNumber: 10,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/11.jpg",
            "assets/images/styles/faceSwap/Man/H/11.jpg",
            "assets/images/styles/faceSwap/Man/S/11.jpg",
        ],
        sortNumber: 11,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/12.jpg",
            "assets/images/styles/faceSwap/Man/H/12.jpg",
            "assets/images/styles/faceSwap/Man/S/12.jpg",
        ],
        sortNumber: 12,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/13.jpg",
            "assets/images/styles/faceSwap/Man/H/13.jpg",
            "assets/images/styles/faceSwap/Man/S/13.jpg",
        ],
        sortNumber: 13,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/14.jpg",
            "assets/images/styles/faceSwap/Man/H/14.jpg",
            "assets/images/styles/faceSwap/Man/S/14.jpg",
        ],
        sortNumber: 14,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/15.jpg",
            "assets/images/styles/faceSwap/Man/H/15.jpg",
            "assets/images/styles/faceSwap/Man/S/15.jpg",
        ],
        sortNumber: 15,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/16.jpg",
            "assets/images/styles/faceSwap/Man/H/16.jpg",
            "assets/images/styles/faceSwap/Man/S/16.jpg",
        ],
        sortNumber: 16,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/17.jpg",
            "assets/images/styles/faceSwap/Man/H/17.jpg",
            "assets/images/styles/faceSwap/Man/S/17.jpg",
        ],
        sortNumber: 17,
    },
    {
        categoryName: "Man",
        imgSrcList: [
            "assets/images/styles/faceSwap/Man/V/18.jpg",
            "assets/images/styles/faceSwap/Man/H/18.jpg",
            "assets/images/styles/faceSwap/Man/S/18.jpg",
        ],
        sortNumber: 18,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/1.jpg",
            "assets/images/styles/faceSwap/Flicka/H/1.jpg",
            "assets/images/styles/faceSwap/Flicka/S/1.jpg",
        ],
        sortNumber: 1,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/2.jpg",
            "assets/images/styles/faceSwap/Flicka/H/2.jpg",
            "assets/images/styles/faceSwap/Flicka/S/2.jpg",
        ],
        sortNumber: 2,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/3.jpg",
            "assets/images/styles/faceSwap/Flicka/H/3.jpg",
            "assets/images/styles/faceSwap/Flicka/S/3.jpg",
        ],
        sortNumber: 3,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/4.jpg",
            "assets/images/styles/faceSwap/Flicka/H/4.jpg",
            "assets/images/styles/faceSwap/Flicka/S/4.jpg",
        ],
        sortNumber: 4,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/5.jpg",
            "assets/images/styles/faceSwap/Flicka/H/5.jpg",
            "assets/images/styles/faceSwap/Flicka/S/5.jpg",
        ],
        sortNumber: 5,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/6.jpg",
            "assets/images/styles/faceSwap/Flicka/H/6.jpg",
            "assets/images/styles/faceSwap/Flicka/S/6.jpg",
        ],
        sortNumber: 6,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/7.jpg",
            "assets/images/styles/faceSwap/Flicka/H/7.jpg",
            "assets/images/styles/faceSwap/Flicka/S/7.jpg",
        ],
        sortNumber: 7,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/8.jpg",
            "assets/images/styles/faceSwap/Flicka/H/8.jpg",
            "assets/images/styles/faceSwap/Flicka/S/8.jpg",
        ],
        sortNumber: 8,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/9.jpg",
            "assets/images/styles/faceSwap/Flicka/H/9.jpg",
            "assets/images/styles/faceSwap/Flicka/S/9.jpg",
        ],
        sortNumber: 9,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/10.jpg",
            "assets/images/styles/faceSwap/Flicka/H/10.jpg",
            "assets/images/styles/faceSwap/Flicka/S/10.jpg",
        ],
        sortNumber: 10,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/11.jpg",
            "assets/images/styles/faceSwap/Flicka/H/11.jpg",
            "assets/images/styles/faceSwap/Flicka/S/11.jpg",
        ],
        sortNumber: 11,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/12.jpg",
            "assets/images/styles/faceSwap/Flicka/H/12.jpg",
            "assets/images/styles/faceSwap/Flicka/S/12.jpg",
        ],
        sortNumber: 12,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/13.jpg",
            "assets/images/styles/faceSwap/Flicka/H/13.jpg",
            "assets/images/styles/faceSwap/Flicka/S/13.jpg",
        ],
        sortNumber: 13,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/14.jpg",
            "assets/images/styles/faceSwap/Flicka/H/14.jpg",
            "assets/images/styles/faceSwap/Flicka/S/14.jpg",
        ],
        sortNumber: 14,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/15.jpg",
            "assets/images/styles/faceSwap/Flicka/H/15.jpg",
            "assets/images/styles/faceSwap/Flicka/S/15.jpg",
        ],
        sortNumber: 15,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/16.jpg",
            "assets/images/styles/faceSwap/Flicka/H/16.jpg",
            "assets/images/styles/faceSwap/Flicka/S/16.jpg",
        ],
        sortNumber: 16,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/17.jpg",
            "assets/images/styles/faceSwap/Flicka/H/17.jpg",
            "assets/images/styles/faceSwap/Flicka/S/17.jpg",
        ],
        sortNumber: 17,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/18.jpg",
            "assets/images/styles/faceSwap/Flicka/H/18.jpg",
            "assets/images/styles/faceSwap/Flicka/S/18.jpg",
        ],
        sortNumber: 18,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/19.jpg",
            "assets/images/styles/faceSwap/Flicka/H/19.jpg",
            "assets/images/styles/faceSwap/Flicka/S/19.jpg",
        ],
        sortNumber: 19,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/20.jpg",
            "assets/images/styles/faceSwap/Flicka/H/20.jpg",
            "assets/images/styles/faceSwap/Flicka/S/20.jpg",
        ],
        sortNumber: 20,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/21.jpg",
            "assets/images/styles/faceSwap/Flicka/H/21.jpg",
            "assets/images/styles/faceSwap/Flicka/S/21.jpg",
        ],
        sortNumber: 21,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/22.jpg",
            "assets/images/styles/faceSwap/Flicka/H/22.jpg",
            "assets/images/styles/faceSwap/Flicka/S/2.jpg",
        ],
        sortNumber: 22,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/23.jpg",
            "assets/images/styles/faceSwap/Flicka/H/23.jpg",
            "assets/images/styles/faceSwap/Flicka/S/23.jpg",
        ],
        sortNumber: 23,
    },
    {
        categoryName: "Flicka",
        imgSrcList: [
            "assets/images/styles/faceSwap/Flicka/V/24.jpg",
            "assets/images/styles/faceSwap/Flicka/H/24.jpg",
            "assets/images/styles/faceSwap/Flicka/S/24.jpg",
        ],
        sortNumber: 24,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/1.jpg",
            "assets/images/styles/faceSwap/Pojke/H/1.jpg",
            "assets/images/styles/faceSwap/Pojke/S/1.jpg",
        ],
        sortNumber: 1,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/2.jpg",
            "assets/images/styles/faceSwap/Pojke/H/2.jpg",
            "assets/images/styles/faceSwap/Pojke/S/2.jpg",
        ],
        sortNumber: 2,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/3.jpg",
            "assets/images/styles/faceSwap/Pojke/H/3.jpg",
            "assets/images/styles/faceSwap/Pojke/S/3.jpg",
        ],
        sortNumber: 3,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/4.jpg",
            "assets/images/styles/faceSwap/Pojke/H/4.jpg",
            "assets/images/styles/faceSwap/Pojke/S/4.jpg",
        ],
        sortNumber: 4,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/5.jpg",
            "assets/images/styles/faceSwap/Pojke/H/5.jpg",
            "assets/images/styles/faceSwap/Pojke/S/5.jpg",
        ],
        sortNumber: 5,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/6.jpg",
            "assets/images/styles/faceSwap/Pojke/H/6.jpg",
            "assets/images/styles/faceSwap/Pojke/S/6.jpg",
        ],
        sortNumber: 6,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/7.jpg",
            "assets/images/styles/faceSwap/Pojke/H/7.jpg",
            "assets/images/styles/faceSwap/Pojke/S/7.jpg",
        ],
        sortNumber: 7,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/8.jpg",
            "assets/images/styles/faceSwap/Pojke/H/8.jpg",
            "assets/images/styles/faceSwap/Pojke/S/8.jpg",
        ],
        sortNumber: 8,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/9.jpg",
            "assets/images/styles/faceSwap/Pojke/H/9.jpg",
            "assets/images/styles/faceSwap/Pojke/S/9.jpg",
        ],
        sortNumber: 9,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/10.jpg",
            "assets/images/styles/faceSwap/Pojke/H/10.jpg",
            "assets/images/styles/faceSwap/Pojke/S/10.jpg",
        ],
        sortNumber: 10,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/11.jpg",
            "assets/images/styles/faceSwap/Pojke/H/11.jpg",
            "assets/images/styles/faceSwap/Pojke/S/11.jpg",
        ],
        sortNumber: 11,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/12.jpg",
            "assets/images/styles/faceSwap/Pojke/H/12.jpg",
            "assets/images/styles/faceSwap/Pojke/S/12.jpg",
        ],
        sortNumber: 12,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/13.jpg",
            "assets/images/styles/faceSwap/Pojke/H/13.jpg",
            "assets/images/styles/faceSwap/Pojke/S/13.jpg",
        ],
        sortNumber: 13,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/14.jpg",
            "assets/images/styles/faceSwap/Pojke/H/14.jpg",
            "assets/images/styles/faceSwap/Pojke/S/14.jpg",
        ],
        sortNumber: 14,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/15.jpg",
            "assets/images/styles/faceSwap/Pojke/H/15.jpg",
            "assets/images/styles/faceSwap/Pojke/S/15.jpg",
        ],
        sortNumber: 15,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/16.jpg",
            "assets/images/styles/faceSwap/Pojke/H/16.jpg",
            "assets/images/styles/faceSwap/Pojke/S/16.jpg",
        ],
        sortNumber: 16,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/17.jpg",
            "assets/images/styles/faceSwap/Pojke/H/17.jpg",
            "assets/images/styles/faceSwap/Pojke/S/17.jpg",
        ],
        sortNumber: 17,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/18.jpg",
            "assets/images/styles/faceSwap/Pojke/H/18.jpg",
            "assets/images/styles/faceSwap/Pojke/S/18.jpg",
        ],
        sortNumber: 18,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/19.jpg",
            "assets/images/styles/faceSwap/Pojke/H/19.jpg",
            "assets/images/styles/faceSwap/Pojke/S/19.jpg",
        ],
        sortNumber: 19,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/20.jpg",
            "assets/images/styles/faceSwap/Pojke/H/20.jpg",
            "assets/images/styles/faceSwap/Pojke/S/20.jpg",
        ],
        sortNumber: 20,
    },
    {
        categoryName: "Pojke",
        imgSrcList: [
            "assets/images/styles/faceSwap/Pojke/V/21.jpg",
            "assets/images/styles/faceSwap/Pojke/H/21.jpg",
            "assets/images/styles/faceSwap/Pojke/S/21.jpg",
        ],
        sortNumber: 21,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/1.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/1.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/1.jpg",
        ],
        sortNumber: 1,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/2.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/2.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/2.jpg",
        ],
        sortNumber: 2,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/3.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/3.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/3.jpg",
        ],
        sortNumber: 3,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/4.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/4.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/4.jpg",
        ],
        sortNumber: 4,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/5.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/5.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/5.jpg",
        ],
        sortNumber: 5,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/6.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/6.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/6.jpg",
        ],
        sortNumber: 6,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/7.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/7.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/7.jpg",
        ],
        sortNumber: 7,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/8.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/8.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/8.jpg",
        ],
        sortNumber: 8,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/9.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/9.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/9.jpg",
        ],
        sortNumber: 9,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/10.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/10.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/10.jpg",
        ],
        sortNumber: 10,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/11.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/11.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/11.jpg",
        ],
        sortNumber: 11,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/12.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/12.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/12.jpg",
        ],
        sortNumber: 12,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/13.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/13.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/13.jpg",
        ],
        sortNumber: 13,
    },
    {
        categoryName: "Kvinna",
        imgSrcList: [
            "assets/images/styles/faceSwap/Kvinna/V/14.jpg",
            "assets/images/styles/faceSwap/Kvinna/H/14.jpg",
            "assets/images/styles/faceSwap/Kvinna/S/14.jpg",
        ],
        sortNumber: 14,
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