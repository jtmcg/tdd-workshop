const queryOpenAI = (openAIClient, queryObject) => {
    if (!openAIClient || !queryObject) {
        console.log({openAIClient, queryObject})
        return Promise.reject(new Error("Argument error"));
    }

    const completion = openAIClient.chat.completions.create(queryObject);
    return "The answer to the Ultimate Question of Life, The Universe, and Everything is 42"
}

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

export default queryOpenAI;