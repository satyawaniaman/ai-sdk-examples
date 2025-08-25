import * as readline from 'readline';
import { generateTextExample } from '../examples/01-text-generation/main';
import { streamTextExample } from '../examples/02-streaming-text/main';
import { systemPromptExample } from '../examples/03-system-prompt/main';
import { dynamicModelExample, getAvailableModels, ModelName } from '../examples/04-dynamic-models/main';
import {  runPersistentChat } from '../examples/05-persistent-chat/main';
const showUsage = () => {
  console.log('Usage: tsx src/cli/main.ts <example>');
  console.log('\nAvailable examples:');
  console.log('  text-generation  - Generate text using AI SDK');
  console.log('  streaming-text   - Stream text generation using AI SDK');
  console.log('  system-prompt    - Generate text with system prompt');
  console.log('  dynamic-models   - Compare different AI models');
  console.log('  persistent-chat  - Chat with persistent history');
  console.log('\nExample:');
  console.log('  tsx src/cli/main.ts text-generation');
};

const main = async () => {
  const example = process.argv[2];
  
  if (!example) {
    showUsage();
    process.exit(1);
  }
  
  if (!['text-generation', 'streaming-text', 'system-prompt', 'dynamic-models','persistent-chat'].includes(example)) {
    console.error(`Error: Unknown example "${example}"`);
    showUsage();
    process.exit(1);
  }
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  // Handle persistent-chat differently since it manages its own readline loop
  if (example === 'persistent-chat') {
    try {
      await runPersistentChat(rl);
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : String(error));
    }
    return;
  }
  
  let selectedModel: ModelName | undefined;
  
  if (example === 'dynamic-models') {
    const availableModels = getAvailableModels();
    console.log('\nAvailable models:');
    availableModels.forEach((model, index) => {
      console.log(`  ${index + 1}. ${model}`);
    });
    
    const modelChoice = await new Promise<string>((resolve) => {
      rl.question('\nSelect a model (1-' + availableModels.length + '): ', (answer) => {
        resolve(answer);
      });
    });
    
    const modelIndex = parseInt(modelChoice) - 1;
    if (modelIndex >= 0 && modelIndex < availableModels.length) {
      selectedModel = availableModels[modelIndex];
    } else {
      console.log('Invalid model selection.');
      rl.close();
      return;
    }
  }
  
  const prompt = await new Promise<string>((resolve) => {
    rl.question('Your prompt: ', (answer) => {
      rl.close();
      resolve(answer);
    });
  });
  
  if (!prompt.trim()) {
    console.log('Please provide a prompt.');
    return;
  }

  try {
    console.log('\nGenerating response...\n');
    
    if (example === 'text-generation') {
      const result = await generateTextExample(prompt);
      console.log(result);
    } else if (example === 'streaming-text') {
      await streamTextExample(prompt);
    } else if (example === 'system-prompt') {
      await systemPromptExample(prompt);
    } else if (example === 'dynamic-models') {
      if (selectedModel) {
        await dynamicModelExample(prompt, selectedModel);
      }
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
  }
};

main();