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

app.use("/users", usersRouter);

app.get("/text-to-image-generate", async (req, res) => {
    let textPrompt = req.query.textPrompt,
        prompt = req.query.prompt,
        category = req.query.category;
    const Replicate = require("replicate");
    const replicate = new Replicate({
        auth: "7a014e73594d8488f4b97e97cc083047b77ab68d"
    });
    try{
        const output = await replicate.run(
            "ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",
            {
                input: {
                    prompt: `${textPrompt}, ${category}, ${prompt}`,
                }
            }
        );
        res.json(output);
    }
    catch(err) {
        res.json(err);
    }
});

/* End Handle The Routes */