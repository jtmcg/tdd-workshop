import queryOpenAI, { getQueryObject } from './3-thirdTest';

const mockCreate = jest.fn();

describe('thirdTest', () => {
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
        expect(typeof queryOpenAI(openAIClientMock)).toBe("string");
    })

    it('should call OpenAI for a completion', () => {
        queryOpenAI(openAIClientMock);
        expect(mockCreate).toBeCalled();
    })

    it('should be called with the correct object', () => {
        const queryObject = getQueryObject("");
        queryOpenAI(openAIClientMock, queryObject);
        expect(mockCreate).toBeCalledWith(queryObject);
    })
})

/**
 * Test Command:
 * `npm test ./doItLive/3-thirdTest.test.js`
*/