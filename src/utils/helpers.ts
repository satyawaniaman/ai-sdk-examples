/**
 * Utility functions for AI SDK examples
 */

// Format streaming text output
export function formatStreamOutput(chunk: string): string {
  return chunk.replace(/\n/g, '\n');
}

// Create a delay for demonstration purposes
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Format file size
export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

// Generate timestamp for file names
export function generateTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
}

// Console logging with colors (simple version)
export const logger = {
  info: (message: string) => console.log(`ℹ️  ${message}`),
  success: (message: string) => console.log(`✅ ${message}`),
  error: (message: string) => console.log(`❌ ${message}`),
  warning: (message: string) => console.log(`⚠️  ${message}`),
  stream: (message: string) => process.stdout.write(message),
};

// Validate environment variables
export function validateEnv(requiredVars: string[]): boolean {
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    logger.error(`Missing required environment variables: ${missing.join(', ')}`);
    logger.info('Please check your .env file');
    return false;
  }
  
  return true;
}