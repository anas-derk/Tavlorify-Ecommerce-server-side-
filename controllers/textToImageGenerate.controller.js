async function runModel(model, input){
    const Replicate = require("replicate");
    const replicate = new Replicate({
        auth: process.env.API_TOKEN,
    });
    try {
        const output = await replicate.run(
            model, { input, },
        );
        return output;
    } catch (err) {
        return err;
    }
}

async function textToImageGenerate(req, res) {
    let textPrompt = req.query.textPrompt,
        prompt = req.query.prompt,
        category = req.query.category,
        style = req.query.style,
        negative_prompt = req.query.negative_prompt;
    switch (category) {
        case "Art": {
            switch (style) {
                case "Epic Origami": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Color Painting": {
                    runModel("cjwbw/dreamshaper:ed6d8bee9a278b0d7125872bddfb9dd3fc4c401426ad634d8246a660e387475b",
                    {
                        prompt: `${textPrompt}, ${category}, ${prompt}`,
                        negative_prompt,
                    })
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "abstract art": {
                    console.log(category, style);
                    break;
                }
                case "Abstract Curves": {
                    console.log(category, style);
                    break;
                }
                case "Cubist v2": {
                    console.log(category, style);
                    break;
                }
                case "Cubist": {
                    console.log(category, style);
                    break;
                }
                case "Detailed Gouache": {
                    console.log(category, style);
                    break;
                }
                case "Neo Impressionist": {
                    console.log(category, style);
                    break;
                }
                case "Pop Art": {
                    console.log(category, style);
                    break;
                }
                case "Candy art": {
                    console.log(category, style);
                    break;
                }
                case "Oil Painting": {
                    console.log(category, style);
                    break;
                }
                default: res.json("Error !!");
            }
            break;
        }
        case "Animals": {
            console.log(category, style);
            break;
        }
        case "Photography": {
            console.log(category, style);
            break;
        }
        case "People": {
            console.log(category, style);
            break;
        }
        case "Landscape & Nature": {
            console.log(category, style);
            break;
        }
        case "Vehicles": {
            console.log(category, style);
            break;
        }
        case "characters & Anime": {
            console.log(category, style);
            break;
        }
        default: res.json("Error !!");
    }
}

module.exports = { textToImageGenerate };