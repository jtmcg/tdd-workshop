import queryOpenAI from './2-secondTest';

const mockCreate = jest.fn();

describe('secondTest', () => {
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
        expect(typeof queryOpenAI()).toBe("string");
    })

    it('should call OpenAI for a completion', () => {
        queryOpenAI(openAIClientMock);
        expect(mockCreate).toBeCalled();
    })
})

/**
 * Test Command:
 * `npm test ./doItLive/2-secondTest.test.js`
*/