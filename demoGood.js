import OpenAI from "openai";
import queryOpenAI, {
    getQueryObject,
    getQueryStringFromFile,
} from "./goodExample/goodExample.js";

// None of this needs testing because process and OpenAI are
// presumably already tested. We could theoretically test that
// the function returns the correct object type and that OpenAI
// is called, but this is where TDD pragmatism vs evangelism 
// is important.
const getNewOpenAIClient = () => {
    // Set up the OpenAI Client
    const API_KEY = process.env.OPEN_API_KEY_TDD_WORKSHOP
    const ORGANIZATION_ID = process.env.OPENAI_ORGANIZATION_ID
    const PROJECT_ID = process.env.OPENAI_TDD_WORKSHOP_PROJECT_ID
    
    return new OpenAI({
        organization: ORGANIZATION_ID,
        project: PROJECT_ID,
        apiKey: API_KEY,
    });
}

const queryString = getQueryStringFromFile("./query.txt");
const queryObject = getQueryObject(queryString);

console.log(await queryOpenAI(getNewOpenAIClient(), queryObject));