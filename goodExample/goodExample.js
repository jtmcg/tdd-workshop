import fs from "fs";

const queryOpenAI = async (openAIClient, queryObject) => {
    if (!openAIClient || !queryObject) {
        console.log({openAIClient, queryObject})
        return Promise.reject(new Error("Argument error"));
    }

    const completion = await openAIClient.chat.completions.create(queryObject)
    return completion.choices[0].message.content;
}

// Could test input/output formatting here. Why might that test
// be useful?
export const getQueryObject = (queryString) => {
    return {
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: queryString,
            },
        ],
    }
}

// Wrapper for fs.readFileSync for readability. Doesn't need
// testing because it's a wrapper for a built-in function.
export const getQueryStringFromFile = (filePath) => {
    return fs.readFileSync(filePath, "utf8");
}

export default queryOpenAI;