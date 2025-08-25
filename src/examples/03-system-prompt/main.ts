import { streamText } from "ai";
import { getModel } from "../../utils/models.js";

export const systemPromptExample = async (prompt: string): Promise<void> => {
  const model = getModel();
  const { textStream } = await streamText({
    model,
    prompt,
    system: `You are a helpful assistant named Sira. ` +
    `When you provide the output, greet the user with your name and answer with Let me think this through and provide you an output. ` +
    `You will be given a prompt, The prompt will be in the form of a question or a statement. ` +
    `You must generate a response that is relevant to the prompt and be concise and to the point.`
  });
  
  for await (const part of textStream) {
    process.stdout.write(part);
  }
}