/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Configuration, OpenAIApi } from "openai";
import { OAI_CONF } from "../configs/openai.config";

const configuration = new Configuration(OAI_CONF);

/**
 * A class that provides access to the OpenAI API for natural language processing.
 */
export class OpenAIService {
    private openAI: OpenAIApi;

    /**
     * Creates an instance of the OpenAI class and initializes the OpenAIApi object.
     * @constructor
     */
    constructor() {
        this.openAI = new OpenAIApi(configuration);
    }

    /**
     * Runs a test of the OpenAI API completion functionality by sending a prompt to the API and logging the response.
     */
    async runOpenAICompletionTest() {
        const response = await this.openAI.createCompletion({
            model: "text-davinci-003",
            prompt: "This is a test",
            max_tokens: 5,
            temperature: 0,
        });
        console.log(response.data);
    }
}