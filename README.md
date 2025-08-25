# AI SDK Learning Project

A comprehensive learning project for exploring various AI SDK capabilities including text generation with streaming, PDF generation, image description, and tool calling.

## 🚀 Features

- **Text Generation with Streaming**: Real-time text generation using OpenAI, Anthropic, and Google AI models
- **PDF Generation**: Create PDFs with AI-generated content using pdf-lib
- **Image Description**: Analyze and describe images using vision models
- **Tool Calling**: Implement function calling with AI models
- **Multiple AI Providers**: Support for OpenAI, Anthropic, and Google AI (Gemini)
- **TypeScript**: Full TypeScript support with proper type definitions
- **Environment Configuration**: Secure API key management
- **Modular Architecture**: Clean, organized code structure

## 📁 Project Structure

```
ai-sdk-learning/
├── src/
│   ├── config/
│   │   └── ai-providers.ts          # AI provider configurations
│   ├── examples/
│   │   ├── text-generation/
│   │   │   └── streaming.ts         # Text streaming examples
│   │   ├── pdf-generation/
│   │   │   └── generate-pdf.ts      # PDF generation examples
│   │   ├── image-description/
│   │   │   └── describe-image.ts    # Image analysis examples
│   │   └── tool-calling/
│   │       └── function-calling.ts  # Tool calling examples
│   ├── utils/
│   │   └── helpers.ts               # Utility functions
│   └── index.ts                     # Main entry point
├── output/                          # Generated PDFs
├── sample-images/                   # Sample images for analysis
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## 🛠️ Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Configuration

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional (for additional providers)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key_here
```

### 3. Get API Keys

- **OpenAI**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- **Anthropic**: Get your API key from [Anthropic Console](https://console.anthropic.com/)
- **Google AI**: Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## 🎯 Usage

### Quick Start

```bash
# Run the main project info
pnpm start

# Or run individual examples
pnpm run stream  # Text generation with streaming
pnpm run pdf     # PDF generation
pnpm run image   # Image description
pnpm run tools   # Tool calling examples
```

### Text Generation with Streaming

```bash
pnpm run stream
```

This example demonstrates:
- Real-time text streaming
- Different prompt types
- Temperature and token control
- Error handling

### PDF Generation

```bash
pnpm run pdf
```

This example demonstrates:
- AI content generation
- PDF document creation
- Text formatting and layout
- File management

Generated PDFs will be saved in the `./output/` directory.

### Image Description

```bash
pnpm run image
```

This example demonstrates:
- Vision model integration
- Image analysis and description
- Object detection
- Color and mood analysis

**Setup for Image Description:**
1. Add image files to the `./sample-images/` directory
2. Supported formats: JPG, PNG, GIF, WebP
3. Run the command to analyze all images

### Tool Calling

```bash
pnpm run tools
```

This example demonstrates:
- Function calling with AI models
- Multiple tool definitions
- Parameter validation with Zod
- Interactive AI experiences

Available tools:
- **Weather**: Get weather information for any location
- **Calculator**: Perform mathematical calculations
- **Time**: Get current time in different timezones
- **File System**: Simulate file operations

### Google AI (Gemini) Examples

```bash
npm run google
```

Showcases Google's Gemini models for text generation, including model comparisons and various use cases.



## 🤝 Contributing

Feel free to extend this project with:

- Additional AI providers
- New example use cases
- Enhanced error handling
- Performance optimizations
- UI components

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🔗 Useful Links

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [PDF-lib Documentation](https://pdf-lib.js.org/)
- [Zod Documentation](https://zod.dev/)

---

**Happy Learning! 🚀**