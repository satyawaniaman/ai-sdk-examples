import { generateText } from 'ai';
import { getModel } from '../../utils/models.js';

/**
 * Generate text using AI SDK
 * @param prompt - The text prompt to generate from
 * @returns Promise<string> - The generated text
 */
export const generateTextExample = async (prompt: string): Promise<string> => {
  const model = getModel();
  const { text } = await generateText({
    model,
    prompt
  });
  return text;
};