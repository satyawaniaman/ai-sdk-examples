import 'dotenv/config';
import { logger } from './utils/helpers.js';

const main = async () => {
  console.log('AI SDK Learning Project');
  console.log('A simple, clean implementation for testing AI SDK capabilities.');
  console.log('\nAvailable Examples:');
  console.log('• Text Generation: npm run text-generation');
  
  console.log('\nSupported AI Providers:');
  console.log('• OpenAI (GPT models)');
  console.log('• Anthropic (Claude models)');
  console.log('• Google AI (Gemini models)');
  
  console.log('\nQuick Start:');
  console.log('1. Copy .env.example to .env');
  console.log('2. Add at least one API key');
  console.log('3. Run: npm run text-generation');
  
  console.log('\nThe example will automatically use the first available API key!');
};

main().catch(console.error);