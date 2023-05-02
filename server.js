/* Start Import And Create Express App */

const express = require("express");

const app = express();

/* End Import And Create Express App */

/* Start Config The Server */

const cors = require("cors"),
    bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

/* End Config The Server */

/* Start Running The Server */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`The Server Is Running On: http://localhost:${PORT}`));

/* End Running The Server */

/* Start Handle The Routes */

const usersRouter = require("./routes/users.router");

app.use("/api/users", usersRouter);

app.get("/api/text-to-image-generate", async (req, res) => {
    let textPrompt = req.query.textPrompt;
    console.log(textPrompt);
    res.json(textPrompt);
    // const Replicate = require("replicate");
    // const replicate = new Replicate({
    //     auth: "r8_GTYggaYuKZbUW93oFgD6Blu1JzGOGDx2NJi9J"
    // });
    // try{
    //     const output = await replicate.run(
    //         "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
    //         {
    //             input: {
    //                 prompt: textPrompt,
    //                 num_outputs: 3,
    //             }
    //         }
    //     );
    //     res.json(output);
    // }
    // catch(err) {
    //     res.json(err);
    // }
});

/* End Handle The Routes */