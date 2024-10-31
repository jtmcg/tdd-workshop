import queryOpenAI from './firstTest';

describe('firstTest', () => {
    it('should return a response string', () => {
        expect(typeof queryOpenAI()).toBe("string");
    })
});

/**
 * Test Command:
 * `npm test ./doItLive/firstTest.test.js`
*/