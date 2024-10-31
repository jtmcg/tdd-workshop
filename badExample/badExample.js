// Query chatGPT from a file
import OpenAI from "openai";
import fs from "fs";

const queryOpenAI = async () => {
    // Set up the OpenAI Client
    const API_KEY = process.env.OPEN_API_KEY_TDD_WORKSHOP
    const ORGANIZATION_ID = process.env.OPENAI_ORGANIZATION_ID
    const PROJECT_ID = process.env.OPENAI_TDD_WORKSHOP_PROJECT_ID
    
    const openai = new OpenAI({
        organization: ORGANIZATION_ID,
        project: PROJECT_ID,
        apiKey: API_KEY,
    });

    // Read the query from our text file
    const filePath = "./query.txt";
    const query = fs.readFileSync(filePath, "utf8");

    // Query OpenAI
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: query,
            },
        ],
    });

    // Log the response
    console.log(completion.choices[0].message.content);
}

export default queryOpenAI;