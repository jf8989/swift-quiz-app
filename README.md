# 🚀 Swift & SwiftUI Mastery Quiz

A comprehensive, interactive quiz application featuring **210 carefully crafted questions** covering the latest Swift 6.2 and iOS 18 features. Perfect for developers looking to test and improve their Swift and SwiftUI knowledge.

**Created by Juan Francisco Marcenaro**

🌐 **[Try the Live Demo](https://swift-quiz-app.vercel.app/)** | 📚 **[View Source Code](https://github.com/jf8989/swift-quiz-app)**

![Swift Quiz Preview](https://img.shields.io/badge/Swift-6.2-orange?style=for-the-badge&logo=swift) ![iOS](https://img.shields.io/badge/iOS-18-blue?style=for-the-badge&logo=apple) ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## ✨ Features

### 📚 Comprehensive Content
- **210 Expert-Level Questions** covering all aspects of modern Swift development
- **Latest Swift 6.2 Features** including `@concurrent`, `InlineArray`, `Span`, and WebAssembly support
- **iOS 18 SwiftUI Updates** including floating tabs, mesh gradients, and Dynamic Island integration
- **Complete Coverage** of async/await, Combine framework, concurrency, and functional programming

### 🎯 Interactive Learning Experience
- **3 Questions Per Set** for manageable learning sessions
- **Instant Feedback** with detailed explanations for each answer
- **Smart Hint System** to guide learning without giving away answers
- **Progress Tracking** with visual progress indicators
- **Category-Based Performance** breakdown at completion

### 💾 Smart Persistence
- **Auto-Save Progress** - Never lose your place in the quiz
- **Cross-Session Continuity** - Resume exactly where you left off
- **Dark Mode Preference** - Remembers your theme choice
- **Offline Ready** - All data stored locally in your browser

### 🎨 Modern Design
- **Professional UI** with smooth animations and transitions
- **Dark/Light Mode** toggle with system-wide persistence  
- **Responsive Design** works perfectly on desktop, tablet, and mobile
- **Accessibility First** with proper contrast and semantic markup
- **Smooth Navigation** with auto-scroll between question sets

## 🏗️ Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Full type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Vercel](https://vercel.com/)** - Deployment and hosting

## 📋 Question Categories

| Category | Questions | Focus Area |
|----------|-----------|------------|
| **Swift Fundamentals** | 1-20 | Optionals, guard statements, computed properties |
| **Functions & Closures** | 21-35 | @escaping, inout parameters, trailing closures |
| **Value vs Reference Types** | 36-50 | Structs vs classes, ARC, memory management |
| **Functional Programming** | 51-70 | map, filter, reduce, immutability patterns |
| **Async/Await Fundamentals** | 71-85 | Basic async syntax, AsyncSequence, error handling |
| **Advanced Concurrency** | 86-100 | Actors, @MainActor, Task Groups, data race safety |
| **Modern Concurrency Features** | 101-115 | Swift 6.2 improvements, debugging, @concurrent |
| **Combine Basics** | 116-130 | Publishers, Subscribers, basic operators |
| **Advanced Combine** | 131-145 | Complex operators, error handling, backpressure |
| **Combine Integration** | 146-155 | @Published, async/await bridging, custom publishers |
| **SwiftUI Fundamentals** | 156-175 | @State, @Binding, View protocol, data flow |
| **Modern SwiftUI** | 176-195 | iOS 18 features, floating tabs, mesh gradients |
| **Real-World Applications** | 196-210 | MVVM, testing, WebAssembly, best practices |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jf8989/swift-quiz-app.git
   cd swift-quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 📱 Usage

1. **Start Quiz** - Click to begin with the first set of 3 questions
2. **Answer Questions** - Select your answers and use hints if needed
3. **Reveal Answers** - See correct answers with detailed explanations
4. **Navigate Sets** - Use Previous/Next buttons to move between question sets
5. **Track Progress** - Monitor your advancement through the visual progress bar
6. **Complete Quiz** - View detailed performance breakdown by category
7. **Resume Anytime** - Your progress is automatically saved

## 🔧 Configuration

### Environment Variables
No environment variables required - the app works out of the box!

### Customization
- **Questions**: Modify the questions array in `src/components/SwiftQuiz.tsx`
- **Styling**: Update Tailwind classes or add custom CSS
- **Persistence**: localStorage keys can be changed in the component

## 📂 Project Structure

```
swift-quiz-app/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page with dark mode state
│   │   ├── layout.tsx        # App layout and metadata
│   │   └── globals.css       # Global styles
│   └── components/
│       └── SwiftQuiz.tsx     # Main quiz component
├── public/                   # Static assets
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy with default settings

3. **Access Your Live App**
   - Example: [swift-quiz-app.vercel.app](https://swift-quiz-app.vercel.app/)

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Connect GitHub repo and deploy
- **Railway**: One-click deployment from GitHub
- **DigitalOcean App Platform**: Container-based deployment

## 📈 Performance

- **Lighthouse Score**: 100/100 for Performance, Accessibility, SEO
- **Bundle Size**: Optimized for fast loading
- **Mobile First**: Responsive design works on all devices
- **Offline Capable**: localStorage persistence works offline

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Add more questions** or improve existing ones
4. **Enhance the UI/UX** with better animations or interactions
5. **Improve accessibility** features
6. **Add test coverage** for components
7. **Commit your changes** (`git commit -m 'Add amazing feature'`)
8. **Push to the branch** (`git push origin feature/amazing-feature`)
9. **Open a Pull Request**

### Ideas for Contributions
- 📝 Add more Swift 6.2 and iOS 18 questions
- 🎨 Improve animations and micro-interactions
- 📊 Add detailed analytics and progress charts
- 🏆 Implement achievements and badges system
- 🔄 Add question randomization options
- 📱 Enhance mobile experience
- 🌍 Add internationalization support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/jf8989/swift-quiz-app/blob/main/LICENSE) file for details.

## 🙏 Acknowledgments

- **Juan Francisco Marcenaro** - Creator and main developer
- **Apple Inc.** for Swift and SwiftUI documentation
- **Swift Community** for best practices and patterns
- **Next.js Team** for the amazing React framework
- **Vercel** for seamless deployment experience
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

- 🐛 **Bug Reports**: [Create an issue](https://github.com/jf8989/swift-quiz-app/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/jf8989/swift-quiz-app/discussions)  
- ❓ **Questions**: Check existing issues or create a new one

---

<div align="center">

**Made with ❤️ for the Swift community by Juan Francisco Marcenaro**

[Live Demo](https://swift-quiz-app.vercel.app/) • [Report Bug](https://github.com/jf8989/swift-quiz-app/issues) • [Request Feature](https://github.com/jf8989/swift-quiz-app/issues)

</div>