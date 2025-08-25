import { streamText } from 'ai';
import { getModel } from '../../utils/models.js';

/**
 * Stream text using AI SDK
 * @param prompt - The text prompt to generate from
 * @returns Promise<void> - Streams text to stdout
 */
export const streamTextExample = async (prompt: string): Promise<void> => {
    const model = getModel();
    const { textStream } = await streamText({
        model,
        prompt
    });
    
    for await (const textPart of textStream) {
        process.stdout.write(textPart);
    }
    console.log(); // Add newline at the end
};