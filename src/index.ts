import 'dotenv/config';

const main = async () => {
  console.log('AI SDK Learning Project');
  console.log('A simple, clean implementation for testing AI SDK capabilities.');
  console.log('\nAvailable Examples:');
  console.log('• Text Generation: pnpm run text-generation');
  console.log('• Streaming Text: pnpm run streaming-text');
  console.log('• System Prompt: pnpm run system-prompt');
  console.log('• Dynamic Models: pnpm run dynamic-models');
  
  console.log('\nSupported AI Providers:');
  console.log('• OpenAI (GPT models)');
  console.log('• Anthropic (Claude models)');
  console.log('• Google AI (Gemini models)');
  
  console.log('\nQuick Start:');
  console.log('1. Copy .env.example to .env');
  console.log('2. Add at least one API key');
  console.log('3. Run any example above');
  
  console.log('\nThe examples will automatically use the first available API key!');
  console.log('\nScript completed successfully. Exiting...');
};

main().catch(console.error);