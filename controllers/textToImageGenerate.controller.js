async function textToImageGenerate(req, res) {
    let textPrompt = req.query.textPrompt,
        prompt = req.query.prompt,
        category = req.query.category;
    const Replicate = require("replicate");
    const replicate = new Replicate({
        auth: process.env.API_TOKEN,
    });
    try {
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
    catch (err) {
        res.json(err);
    }
}

module.exports = { textToImageGenerate };