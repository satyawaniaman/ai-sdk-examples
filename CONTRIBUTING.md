# Contributing to AI SDK Learning Examples

Thank you for your interest in contributing to this AI SDK learning project! This guide will walk you through the process of adding new examples.

## Adding New AI SDK Examples

Follow these steps to create new AI SDK examples in this codebase:

### Step 1: Create the Example Directory

Create a new folder in `src/examples/` following the naming pattern:
```
src/examples/03-your-example-name/
```

### Step 2: Create the Main Example File

Create `main.ts` in your example directory with this structure:

```typescript
import { /* your imports */ } from 'ai';
import { getModel } from '../../utils/models';

/**
 * Your example function description
 * @param prompt - The text prompt to process
 * @returns Promise<string|void> - The result or void for streaming
 */
export async function yourExampleFunction(prompt: string) {
  const model = getModel();
  // Your AI SDK implementation here
  // Return the result or handle streaming
}
```

### Step 3: Update the Unified CLI

Add your example to `src/cli/main.ts`:

1. **Import your function:**
```typescript
import { yourExampleFunction } from '../examples/03-your-example-name/main';
```

2. **Add it to the switch statement:**
```typescript
else if (example === 'your-example-name') {
  await yourExampleFunction(prompt);
}
```

3. **Update the usage message** to include your new example.

### Step 4: Add Package.json Script

Add a new script in `package.json`:

```json
"your-example-name": "tsx src/cli/main.ts your-example-name"
```

### Step 5: Test Your Example

1. **Test via CLI:**
   ```bash
   pnpm run your-example-name
   ```

2. **Test programmatic usage:**
   ```typescript
   import { yourExampleFunction } from './src/examples/03-your-example-name/main';
   const result = await yourExampleFunction('test prompt');
   ```

### Step 6: Build and Verify

Run `npm run build` to ensure everything compiles correctly.

## Example Types You Can Create

- **Image Generation:** Using `generateImage()` from AI SDK
- **Tool Calling:** Using `tools` parameter with function definitions
- **Multi-modal:** Combining text and images
- **Custom Models:** Using different providers (Anthropic, Google, etc.)
- **Advanced Streaming:** With custom handling and formatting
- **RAG (Retrieval Augmented Generation):** Combining external data sources
- **Function Calling:** Creating AI agents that can execute functions
- **Embeddings:** Working with vector embeddings for semantic search

## Key Patterns to Follow

✅ **Export a clean function** that takes parameters and returns results  
✅ **Import from `../../utils/models`** for consistent model configuration  
✅ **Handle errors gracefully** with try-catch blocks  
✅ **Follow the established naming conventions** (kebab-case for directories and scripts)  
✅ **Add comprehensive comments** explaining the AI SDK concepts being demonstrated  
✅ **Include JSDoc documentation** for all exported functions  
✅ **Use proper TypeScript typing** for parameters and return values  

## Code Quality Guidelines

- **TypeScript:** Use proper typing for all functions and variables
- **Error Handling:** Always wrap AI SDK calls in try-catch blocks
- **Documentation:** Add JSDoc comments for exported functions
- **Consistency:** Follow the existing code style and patterns
- **Performance:** Consider streaming for long-running operations

## Architecture Benefits

This architecture ensures your examples are:
- **Reusable** as importable functions
- **Testable** both standalone and via CLI
- **Maintainable** with consistent patterns
- **Educational** with clear, focused implementations
- **Scalable** for adding many more examples

## Getting Help

If you need help or have questions:
1. Check existing examples for reference patterns
2. Review the AI SDK documentation
3. Test your implementation thoroughly before submitting

## Submission Guidelines

1. Ensure your example builds without errors
2. Test both CLI and standalone execution
3. Add clear documentation and comments
4. Follow the established naming conventions
5. Include example usage in your function documentation

Thank you for contributing to the AI SDK learning community! 🚀