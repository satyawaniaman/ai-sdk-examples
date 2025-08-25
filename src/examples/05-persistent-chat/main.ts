// src/examples/05-persistent-chat/main.ts
import type { Interface as ReadlineInterface } from 'readline';
import { type CoreMessage } from 'ai';
import { startServer } from './server';
import { createReadStream, createWriteStream, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

// Simple file-based session storage
interface ChatSession {
  id: string;
  messages: CoreMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const SESSIONS_DIR = join(process.cwd(), 'chat-sessions');

// Ensure sessions directory exists
if (!existsSync(SESSIONS_DIR)) {
  mkdirSync(SESSIONS_DIR, { recursive: true });
}

function loadSession(sessionId: string): ChatSession {
  const sessionPath = join(SESSIONS_DIR, `${sessionId}.json`);
  
  if (existsSync(sessionPath)) {
    try {
      const data = require(sessionPath);
      return {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt)
      };
    } catch (error) {
      console.warn(`Failed to load session ${sessionId}, creating new one`);
    }
  }
  
  return {
    id: sessionId,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

function saveSession(session: ChatSession): void {
  const sessionPath = join(SESSIONS_DIR, `${session.id}.json`);
  session.updatedAt = new Date();
  
  try {
    writeFileSync(sessionPath, JSON.stringify(session, null, 2));
  } catch (error) {
    console.error(`Failed to save session ${session.id}:`, error);
  }
}

export async function runPersistentChat(rl: ReadlineInterface) {
  // Start the server
  console.log('Starting chat server...');
  const server = await startServer();
  console.log('Chat server started on http://localhost:4317');
  
  // Ask for a session ID to persist chat history between runs
  const sessionId = await question(rl, 'Session ID (e.g. demo-user-1): ');
  if (!sessionId.trim()) {
    console.log('Please provide a session ID.');
    rl.close();
    return;
  }

  // Load existing session (or create a new one)
  let session: ChatSession = loadSession(sessionId);
  
  console.log(`\nLoaded session: ${sessionId}`);
  console.log(`Messages in history: ${session.messages.length}`);
  console.log('\nType your messages. Type "/exit" to quit, "/reset" to clear history, "/history" to show chat history.\n');

  while (true) {
    const userInput = await question(rl, 'You: ');
    if (!userInput.trim()) continue;

    if (userInput.trim().toLowerCase() === '/exit') {
      break;
    }
    
    if (userInput.trim().toLowerCase() === '/reset') {
      session.messages = [];
      saveSession(session);
      console.log('(Chat history cleared)');
      continue;
    }
    
    if (userInput.trim().toLowerCase() === '/history') {
      console.log('\n--- Chat History ---');
      if (session.messages.length === 0) {
        console.log('No messages in history.');
      } else {
        session.messages.forEach((msg, index) => {
          console.log(`${index + 1}. ${msg.role}: ${msg.content}`);
        });
      }
      console.log('--- End History ---\n');
      continue;
    }

    // Append user message to history
    session.messages.push({ role: 'user', content: userInput });

    try {
      // Call the server API
      const response = await fetch('http://localhost:4317/api/get-completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(session.messages),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const responseMessages: CoreMessage[] = await response.json();
      
      // Find the assistant's response (last message)
      const assistantMessage = responseMessages[responseMessages.length - 1];
      
      if (assistantMessage && assistantMessage.role === 'assistant') {
        // Handle content that might be string or array of content parts
        const content = typeof assistantMessage.content === 'string' 
          ? assistantMessage.content 
          : Array.isArray(assistantMessage.content) 
            ? assistantMessage.content.map(part => 
                typeof part === 'string' ? part : 
                typeof part === 'object' && part && 'text' in part ? part.text :
                JSON.stringify(part)
              ).join('')
            : JSON.stringify(assistantMessage.content);
        
        console.log(`Assistant: ${content}`);
        
        // Update session with the complete conversation
        session.messages = responseMessages;
        saveSession(session);
      } else {
        console.log('Error: No assistant response received');
      }
    } catch (error) {
      console.error('Error calling chat API:', error instanceof Error ? error.message : String(error));
      // Remove the user message since the API call failed
      session.messages.pop();
    }
  }

  console.log('\nChat session ended. Goodbye!');
  rl.close();
  
  // Close the server
  server.close();
}

// Small helper to promisify rl.question without closing rl
function question(rl: ReadlineInterface, q: string) {
  return new Promise<string>((resolve) => rl.question(q, resolve));
}