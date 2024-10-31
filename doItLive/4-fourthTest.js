const queryOpenAI = (openAIClient, queryObject) => {
    // if (!openAIClient || !queryObject) {
    //     console.log({openAIClient, queryObject})
    //     return Promise.reject(new Error("Argument error"));
    // }

    const completion = openAIClient.chat.completions.create(queryObject);
    return "Asshole Driven Development 😝"
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