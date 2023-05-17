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

function textToImageGenerate(req, res) {
    let textPrompt = req.query.textPrompt,
        prompt = req.query.prompt,
        category = req.query.category,
        style = req.query.style,
        negative_prompt = req.query.negative_prompt;
    switch (category) {
        case "Art": {
            switch (style) {
                case "line art": {
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
                case "art deco": {
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
                case "Vasily kandinsky": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Palette knife": {
                    runModel("cjwbw/dreamshaper:ed6d8bee9a278b0d7125872bddfb9dd3fc4c401426ad634d8246a660e387475b",
                    {
                        prompt: `${textPrompt}, ${category}, ${prompt}`,
                        negative_prompt,
                    })                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Abstract Expressionism": {
                    runModel("stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
                    {
                        prompt: `${textPrompt}, ${category}, ${prompt}`,
                        negative_prompt,
                    })                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Pop Art": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Neo Impressionist": {
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
                case "scandinavian modern art": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
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
                case "flower ART": {
                    runModel("stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
                    {
                        prompt: `${textPrompt}, ${category}, ${prompt}`,
                        negative_prompt,
                    })                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Horror": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Charcoal": {
                    runModel("cjwbw/dreamshaper:ed6d8bee9a278b0d7125872bddfb9dd3fc4c401426ad634d8246a660e387475b",
                    {
                        prompt: `${textPrompt}, ${category}, ${prompt}`,
                        negative_prompt,
                    })                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "abstract art": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Cubist": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Candy art": {
                    runModel("cjwbw/dreamshaper:ed6d8bee9a278b0d7125872bddfb9dd3fc4c401426ad634d8246a660e387475b",
                    {
                        prompt: `${textPrompt}, ${category}, ${prompt}`,
                        negative_prompt,
                    })                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Oil Painting": {
                    runModel("stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
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
                case "Gouache": {
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
                case "Surreal": {
                    runModel("tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
                    {
                        prompt: `${textPrompt}, ${category}, ${prompt}`,
                        negative_prompt,
                    })                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Cubist v2": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                default: res.json("Error !!");
            }
            break;
        }
        case "Animals": {
            switch (style) {
                case "Cubist v2": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Cubist": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Neo Impressionist": {

                    break;
                }
                case "Pop Art": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Pet Portrait": {
                    runModel("tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
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
                default: res.json("Error !");
            }
            break;
        }
        case "Photography": {
            switch (style) {
                case "Photo": {
                    runModel("stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
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
                case "Classic Cars Photography": {
                    runModel("prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",
                    {
                        prompt: `${textPrompt}, ${category}, ${prompt}`,
                    })
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Pet Portrait": {
                    runModel("tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
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
                case "Food Photography": {
                    runModel("stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
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
                default: res.json("Error !");
            }
            break;
        }
        case "People": {
            switch (style) {
                case "Artistic Portrait": {
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
                case "B&W Portrait": {
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
                case "Color Portrait": {
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
                case "Striking": {
                    runModel("tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
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
                case "Hyperreal": {
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
                case "Vibrant": {
                    runModel("tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
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
                case "Neo Impressionist": {
                    
                    break;
                }
                case "Pop Art": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Street Pop Art 2": {
                    runModel("prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",
                    {
                        prompt: `${textPrompt}, ${category}, ${prompt}`,
                    })
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "fauvist portrait painting": {
                    runModel("tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
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
                default: res.json("Error !");
            }
            break;
        }
        case "Landscape & Nature": {
            switch (style) {
                case "Epic1": {
                    runModel("stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
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
                case "Epic2": {
                    runModel("tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
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
                case "Epic3": {
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
                case "Detailed Gouache": {
                    runModel("stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
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
                case "Neo Impressionist": {
                    
                    break;
                }
                case "Oil Painting": {
                    runModel("stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
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
                default: res.json("Error !");
            }
            break;
        }
        case "Vehicles": {
            switch (style) {
                case "Sunset Synthwave": {
                    runModel("stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
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
                case "Classic Cars Photography": {
                    runModel("prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",
                    {
                        prompt: `${textPrompt}, ${category}, ${prompt}`,
                    })
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                default: res.json("Error !");
            }
            break;
        }
        case "characters & Anime": {
            switch (style) {
                case "Anime": {
                    runModel("tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
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
                case "Anime v2": {
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
                case "colorful Fantasy": {
                    runModel("cjwbw/anything-v4.0:42a996d39a96aedc57b2e0aa8105dea39c9c89d9d266caf6bb4327a1c191b061",
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
                case "Dark Fantasy": {
                    runModel("cjwbw/anything-v4.0:42a996d39a96aedc57b2e0aa8105dea39c9c89d9d266caf6bb4327a1c191b061",
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
                case "Animation Character": {
                    runModel("prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",
                    {
                        prompt: `${textPrompt}, ${category}, ${prompt}`,
                    })
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "CGI Character": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                case "Anime portrait": {
                    runModel("ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",{ prompt: `${textPrompt}, ${category}, ${prompt}`})
                    .then((output) => {
                        res.json(output);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                    break;
                }
                default: res.json("Error !");
            }
            break;
        }
        default: res.json("Error !!");
    }
}

module.exports = { textToImageGenerate };