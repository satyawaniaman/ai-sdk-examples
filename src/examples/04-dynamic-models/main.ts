import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText, LanguageModel } from 'ai';

const availableModels: Record<string, LanguageModel> = {
  'gpt-4o-mini': openai('gpt-4o-mini'),
  'claude-3-haiku': anthropic('claude-3-haiku-20240307'),
  'gemini-1.5-flash': google('gemini-1.5-flash'),
};

export type ModelName = keyof typeof availableModels;

export const getAvailableModels = (): ModelName[] => {
  return Object.keys(availableModels) as ModelName[];
};

export const dynamicModelExample = async (prompt: string, modelName: ModelName): Promise<void> => {
  const model = availableModels[modelName];
  
  if (!model) {
    throw new Error(`Model "${modelName}" is not available. Available models: ${getAvailableModels().join(', ')}`);
  }

  console.log(`\nUsing model: ${modelName}\n`);
  
  const { textStream } = await streamText({
    model,
    prompt
  });
  
  for await (const part of textStream) {
    process.stdout.write(part);
  }
  
  console.log('\n'); // Add newline at the end
};
