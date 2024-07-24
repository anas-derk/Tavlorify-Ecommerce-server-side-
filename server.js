/* Start Import And Create Express App */

const express = require("express");

const app = express();

/* End Import And Create Express App */

/* Start Config The Server */

const cors = require("cors"),
    bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

require("dotenv").config();

/* End Config The Server */

/* Start direct the browser to statics files path */

const path = require("path");

/* End direct the browser to statics files path */

/* Start Running The Server */

const mongoose = require("mongoose");

const PORT = process.env.PORT || 5300;

app.listen(PORT, async () => {
    console.log(`The Server Is Running On: http://localhost:${PORT}`);
    try {
        await mongoose.connect(process.env.DB_URL);
    }
    catch (err) {
        console.log(err);
    }

    app.use("/assets", express.static(path.join(__dirname, "assets")));

    /* Start Handle The Routes */

    app.use("/admins", require("./routes/admins.router"));

    app.use("/text-to-image", require("./routes/textToImage.router"));

    app.use("/image-to-image", require("./routes/imageToImage.router"));

    app.use("/orders", require("./routes/orders.router"));

    app.use("/returned-orders",  require("./routes/returnedOrders.router"));

    app.use("/generated-images", require("./routes/generatedImages.router"));

    app.use("/prices", require("./routes/prices.router"));

    app.use("/face-swap", require("./routes/faceSwap.router"));

    /* End Handle The Routes */
});

/* End Running The Server */

/* Start Handling Events */

mongoose.connection.on("connected", () => console.log("connected"));
mongoose.connection.on("disconnected", () => console.log("disconnected"));
mongoose.connection.on("reconnected", () => console.log("reconnected"));
mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
mongoose.connection.on("close", () => console.log("close"));

process.on("SIGINT", async () => {
    try{
        await mongoose.connection.close();
    }
    catch(err) {
        console.log(err);
    }
});

/* End Handling Events */

module.exports = {
    mongoose,
}