import queryOpenAI, {getQueryObject} from './goodExample'

// Setup tests
const createMockCompletionResponse = (responseString) => {
    return {
        choices: [
            {
                message: {
                    content: responseString,
                },
            },
        ],
    };
}

describe('goodExample', () => {
    var openAIClientMock;
    const mockCreate = jest.fn();
    
    beforeEach(() => {
        mockCreate.mockReset();
        openAIClientMock = {
            chat: {
                completions: {
                    create: mockCreate
                }
            }
        }

        mockCreate.mockImplementation((queryObject) => {
            return new Promise((resolve, _) => {
                if (queryObject.messages[1].content === "What is the Ultimate Question of Life, The Universe, and Everything?") {
                    resolve(createMockCompletionResponse("...computing"));
                } else {
                    resolve(createMockCompletionResponse("The answer to the Ultimate Question of Life, The Universe, and Everything is 42"));
                }
            });
        });
    })

    // Test code
    it('should return a response string', async () => {
        const queryObject = getQueryObject("");
        expect(typeof await queryOpenAI(openAIClientMock, queryObject)).toBe("string");
    })

    it('should call OpenAI for a completions', async () => {
        const queryObject = getQueryObject("");
        await queryOpenAI(openAIClientMock, queryObject);
        expect(mockCreate).toBeCalled();
    })

    it('should be called with the correct object', async () => {
        const queryObject = getQueryObject("");
        await queryOpenAI(openAIClientMock, queryObject);
        expect(mockCreate).toBeCalledWith(queryObject);
    })

    it('should error when not called with the correct number of arguments', () => {
        expect(queryOpenAI()).rejects.toThrow("Argument error");
    })

    it('should return the completion response', async () => {
        const queryObject = getQueryObject("What is the answer to the Ultimate Question of Life, The Universe, and Everything?");
        const response = await queryOpenAI(openAIClientMock, queryObject);
        expect(response).toBe("The answer to the Ultimate Question of Life, The Universe, and Everything is 42");
    })

    it('should return a different completion response for a different query', async () => {
        const queryObject = getQueryObject("What is the Ultimate Question of Life, The Universe, and Everything?");
        const response = await queryOpenAI(openAIClientMock, queryObject);
        expect(response).toBe("...computing");
    })
})

