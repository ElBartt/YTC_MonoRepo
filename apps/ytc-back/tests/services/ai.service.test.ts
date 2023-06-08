/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { OpenAIService } from '../../src/services/ai.service';

// Mock the OpenAIApi class for testing
jest.mock('openai', () => {
    const mockCreateCompletion = jest.fn().mockResolvedValue({ data: 'Mocked response' });
    const mockOpenAIApi = jest.fn().mockImplementation(() => ({
        createCompletion: mockCreateCompletion,
    }));
    return { Configuration: jest.fn(), OpenAIApi: mockOpenAIApi };
});

describe('OpenAI', () => {
    let openAI: OpenAIService;

    beforeEach(() => {
        openAI = new OpenAIService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('runOpenAICompletionTest', () => {
        it('should call createCompletion with the correct parameters', async () => {
            const createCompletionMock = jest.spyOn(openAI['openAI'], 'createCompletion');
            await openAI.runOpenAICompletionTest();
            expect(createCompletionMock).toHaveBeenCalledWith({
                model: 'text-davinci-003',
                prompt: 'This is a test',
                max_tokens: 5,
                temperature: 0,
            });
        });

        it('should log the response data', async () => {
            const consoleSpy = jest.spyOn(console, 'log');
            await openAI.runOpenAICompletionTest();
            expect(consoleSpy).toHaveBeenCalledWith('Mocked response');
        });
    });
});