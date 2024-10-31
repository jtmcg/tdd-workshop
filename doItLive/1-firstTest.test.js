import queryOpenAI from './1-firstTest';

describe('firstTest', () => {
    it('should return a response string', () => {
        expect(typeof queryOpenAI()).toBe("string");
    })
});

/**
 * Test Command:
 * `npm test ./doItLive/1-firstTest.test.js`
*/