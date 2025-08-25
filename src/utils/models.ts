import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import type { LanguageModel } from 'ai';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Get the first available AI model based on configured API keys
 * Priority: OpenAI -> Anthropic -> Google
 */
export const getModel = (): LanguageModel => {
  if (process.env.OPENAI_API_KEY) return openai('gpt-4o-mini');
  if (process.env.ANTHROPIC_API_KEY) return anthropic('claude-3-5-haiku-20241022');
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) return google('gemini-1.5-flash-002');
  throw new Error('No API key found. Please set OPENAI_API_KEY, ANTHROPIC_API_KEY, or GOOGLE_GENERATIVE_AI_API_KEY');
};

/**
 * Get a specific OpenAI model
 */
export const getOpenAIModel = (modelName: string = 'gpt-4o-mini'): LanguageModel => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required');
  }
  return openai(modelName);
};

/**
 * Get a specific Anthropic model
 */
export const getAnthropicModel = (modelName: string = 'claude-3-5-haiku-20241022'): LanguageModel => {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is required');
  }
  return anthropic(modelName);
};

/**
 * Get a specific Google model
 */
export const getGoogleModel = (modelName: string = 'gemini-1.5-flash-002'): LanguageModel => {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is required');
  }
  return google(modelName);
};