import queryOpenAI, { getQueryObject } from './4-fourthTest';

const mockCreate = jest.fn();

describe('fourthTest', () => {
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
    })

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
})

/**
 * Test Command:
 * `npm test ./doItLive/4-fourthTest.test.js`
*/