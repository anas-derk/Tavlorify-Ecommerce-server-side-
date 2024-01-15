// Import Mongoose And Image To Image Style Model Object

const { mongoose, faceSwapStyleModel } = require("./all.models");

async function getAllStylesData(){
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const stylesData = await faceSwapStyleModel.find({}).sort({ sortNumber: 1 });
        await mongoose.disconnect();
        return stylesData;
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

module.exports = {
    getAllStylesData,
}