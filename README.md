# PokerFace AI 🎭

A poker analysis AI that combines technical strategy with personality. Built on ElizaOS's framework, PokerFace AI analyzes poker situations from images and provides strategic advice with the character of a seasoned poker pro.

## 🎯 Features

- 🔍 Image-based poker situation analysis
- 🤖 Character-driven responses with professional insights
- 🌐 Multiple AI provider support (OpenAI, Google)
- 🎲 GTO-based strategic advice
- 🎭 Rich personality system
- 🐦 Twitter/X integration

## Prerequisites

    - Python 2.7+
    - Node.js 23+
    - pnpm
    - Note for Windows Users: WSL 2 is required.

## 🚀 Quick Start

1. Clone and install:

    ```bash
    git clone <https://github.com/energeticelephant/pokerface-ai.git>
    cd pokerface-ai
    pnpm install
    ```

2. Configure environment variables:

   ## Provider Configuration

   ## Choose one AI provider

   ### OpenAI

    ```env
   OPENAI_API_KEY=your_key_here
    ```

   ### OR Google AI

    ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
    ```

   ## Twitter Integration (Optional)

    ```env
   TWITTER_API_KEY=your_key
   TWITTER_API_SECRET=your_secret
   TWITTER_ACCESS_TOKEN=your_token
   TWITTER_ACCESS_SECRET=your_secret
    ```

## 💻 Usage

### Character Configuration

The `pokerfaceai.character.json` defines:

- Poker expertise and knowledge
- Speaking style and personality
- Response examples
- Strategic analysis approach

## 🤝 Contributing

Contributions are welcome! Please read `CONTRIBUTING.md` for guidelines.

## 🔗 Links

- Twitter: [Link](https://x.com/pokerface_ai)
- ElizaOS: [Link](https://github.com/elizaos/eliza)

## 🙏 Acknowledgments

Built on ElizaOS framework - (<https://github.com/elizaos/eliza>)
