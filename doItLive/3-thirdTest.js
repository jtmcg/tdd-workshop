const queryOpenAI = (openAIClient) => {

    const completion = openAIClient.chat.completions.create();
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