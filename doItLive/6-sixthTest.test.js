import queryOpenAI, { getQueryObject } from './6-sixthTest';

const mockCreate = jest.fn();

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

describe('sixthTest', () => {
    var openAIClientMock;

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
            if (queryObject.messages[1].content === "What is the Ultimate Question of Life, The Universe, and Everything?") {
                return createMockCompletionResponse("...computing");
            } else {
                return createMockCompletionResponse("The answer to the Ultimate Question of Life, The Universe, and Everything is 42");
            }
        });
    });

    it('should return a response string', () => {
        const queryObject = getQueryObject("");
        expect(typeof queryOpenAI(openAIClientMock, queryObject)).toBe("string");
    })

    it('should call OpenAI for a completion', () => {
        const queryObject = getQueryObject("");
        queryOpenAI(openAIClientMock, queryObject);
        expect(mockCreate).toBeCalled();
    })

    it('should be called with the correct object', () => {
        const queryObject = getQueryObject("");
        queryOpenAI(openAIClientMock, queryObject);
        expect(mockCreate).toBeCalledWith(queryObject);
    })

    // Unnecessary for typed languages
    it('should error when not called with the correct number of arguments', () => {
        expect(queryOpenAI()).rejects.toThrow("Argument error");
    })

    // FINALLY, we're getting somewhere...
    it('should return the completion response', () => {
        const queryObject = getQueryObject("What is the answer to the Ultimate Question of Life, The Universe, and Everything?");
        const response = queryOpenAI(openAIClientMock, queryObject);
        expect(response).toBe("The answer to the Ultimate Question of Life, The Universe, and Everything is 42");
    })

    // Asshole...
    it('should return a different completion response for a different query', async () => {
        const queryObject = getQueryObject("What is the Ultimate Question of Life, The Universe, and Everything?");
        const response = await queryOpenAI(openAIClientMock, queryObject);
        expect(response).toBe("...computing");
    })
})

/**
 * Test Command:
 * `npm test ./doItLive/6-sixthTest.test.js`
*/