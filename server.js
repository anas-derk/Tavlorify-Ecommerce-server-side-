/* Start Import And Create Express App */

const express = require("express");

const app = express();

/* End Import And Create Express App */

/* Start Config The Server */

const cors = require("cors"),
    bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

require('dotenv').config();

/* End Config The Server */

/* Start direct the browser to statics files path */

const path = require("path");

app.use("/assets", express.static(path.join(__dirname, "assets")));

/* End direct the browser to statics files path */

/* Start Running The Server */

const PORT = process.env.PORT || 5300;

app.listen(PORT, () => console.log(`The Server Is Running On: http://localhost:${PORT}`));

/* End Running The Server */

/* Start Handle The Routes */

const usersRouter = require("./routes/users.router"),
    adminRouter = require("./routes/admin.router"),
    textToImageRouter = require("./routes/textToImage.router"),
    imageToImageRouter = require("./routes/imageToImage.router"),
    ordersRouter = require("./routes/orders.router"),
    generatedImagesRouter = require("./routes/generatedImages.router"),
    pricesRouter = require("./routes/prices.router"),
    returnedOrdersRouter = require("./routes/returnedOrders.router");

app.use("/users", usersRouter);

app.use("/admin", adminRouter);

app.use("/text-to-image", textToImageRouter);

app.use("/image-to-image", imageToImageRouter);

app.use("/orders", ordersRouter);

app.use("/generated-images", generatedImagesRouter);

app.use("/prices", pricesRouter);

app.use("/returned-orders", returnedOrdersRouter);

/* End Handle The Routes */