import queryOpenAI from "./badExample";
import OpenAI from "openai";

jest.mock("openai")

describe("badExample", () => {
  var openaiMock;
  const createMock = jest.fn();
  const consoleLog = jest.spyOn(console, "log").mockImplementation();

  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks();

    // Mock the OpenAI class
    openaiMock = {
      chat: {
        completions: {
          create: createMock.mockResolvedValue({
            choices: [{ 
              message: {
                content: "Mocked response from OpenAI",
              }
            }]
          })
        }
      }
    };

    // Mock the OpenAI constructor to return the mock implementation
    OpenAI.mockImplementation(() => openaiMock);
  });

  it("should return a response from OpenAI", async () => {
    await queryOpenAI();
    expect(consoleLog).toBeCalledWith("Mocked response from OpenAI");
  });

  it("should call create on the OpenAI client with the proper string", async () => {
    await queryOpenAI();
    expect(createMock).toBeCalledWith(
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            // I have to know what's in the file, here, so I can't
            // change the file content without changing the test
            content: "Hey ChatGPT, how's it going?",
          },
        ],
      }
    );
  })
});

/** 
 * 1. How do I write a test to confirm reading from the right file?
 * 2. How do I write a test that we are actually querying OpenAI? Maybe I mock
      the OpenAI API? That sounds annoying and like a lot of work...
 * 3. How do I ensure we're actually printing the correct response from OpenAI?
      I could hard-code the console.log string and we'd never know it failed...
 * 4. How do I mock the environment variables and client instantiation? Should I?
 *
 * All of this is hard, so I probably don't do it and settle with just these two
 * tests above 😅
*/