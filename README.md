# SimpleDash 🌤️

> Your minimalist personal dashboard for staying organized and informed

SimpleDash is a relatively clean, modern web-based dashboard that brings together everything you need in one place - weather updates, task management, and calendar functionality. Built as a learning project to explore modern web development practices.

_Why the name? dunno just cause_

## ✨ Features

### 🌡️ Weather Widget
- Real-time weather information with detailed forecasts
- 8-day weather predictions with beautiful visualizations
- Interactive temperature graphs showing daily patterns (morning, day, evening, night)
- Wind speed, humidity, and atmospheric pressure metrics
- Location-based weather updates

### ✅ Todo List Manager
- Create and manage daily tasks with ease
- Date-specific task organization
- Navigate between days to plan ahead
- Simple, distraction-free interface
- Persistent task storage using local browser storage

### 📅 Calendar Widget
- Monthly calendar view for easy date navigation
- Navigate through months effortlessly
- Clean grid layout for quick date reference
- Responsive design that works on all screen sizes

### 🎨 Theme Support
- Automatic light/dark mode based on system preferences
- Manual theme toggle for personal preference
- Seamless theme transitions
- Persistent theme selection

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/7apri/TooSimpleDash-schoolProject.git
cd TooSimpleDash-schoolProject
```

2. Install dependencies:
```bash
npm install
```

3. For now u have to copy the iconBundle.svg from /assets to-> /dist/assets

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to the local server address (typically `http://localhost:5173`)

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🛠️ Development Status

This project is currently under active development as part of a learning journey into modern web development. While the core functionality is working, there are still features being refined and improved. Think of it as a work-in-progress masterpiece! 🎨

### Known Limitations
- The dev is too lazy to make a working product.
- The API key is currently exposed on the client-side i am planning to solve this with a proper backend.
- Most features should be optimized for better performance
- Authentication system is planned but not yet implemented

## 📋 Roadmap

- [ ] Better project structure for vite (was not originaly made with vite in mind)
- [ ] Full logic refactor and code cleanup
- [ ] A working back end to make it actually work
- [ ] Full authentication and user management
- [ ] Cloud synchronization for tasks and settings
- [ ] Multi-language support
- [ ] Additional widget types (news, stocks, etc.)
- [ ] Widget customization and layouts 
- [ ] Mobile app version

## 🏗️ Project Structure

```
TooSimpleDash/
├── css/              # Stylesheets for components and layouts
├── js/               # JavaScript modules and components
│   ├── dashboard/    # Main dashboard logic
│   └── util/         # Utility functions
├── assets/           # Icons, images, and static resources
├── dist/             # Production build output
└── index.html        # Main application entry point
```

## 🎯 Technologies & Architecture

This project showcases modern web development practices and leverages cutting-edge technologies:

**Frontend Stack:** Vanilla JavaScript ES6+ modules, semantic HTML5, modular CSS3 with custom properties, responsive design patterns

**Build Pipeline:** Vite for blazing-fast HMR and optimized bundling, PostCSS for advanced CSS processing, PurgeCSS for tree-shaking unused styles, cssnano for minification

**Performance Optimization:** Code splitting, lazy loading, asset optimization, runtime performance monitoring

**Development Workflow:** Component-based architecture, modular design patterns, separation of concerns, progressive enhancement

**Browser APIs:** LocalStorage for state persistence, Canvas API for data visualization, Fetch API for async data retrieval, MediaQuery for responsive theming

**Core Concepts:** Event-driven architecture, reactive patterns, functional programming paradigms, immutable data structures, observer pattern implementation

**UX/Accessibility:** WCAG 2.1 compliant, ARIA labels and roles, keyboard navigation support, screen reader optimization, semantic markup

**Code Quality:** Modern ES modules, async/await patterns, promise-based workflows, clean code principles, DRY methodology

**Architecture Patterns:** MVC-inspired structure, service layer abstraction, component lifecycle management, state management strategies, pub/sub event handling

---

Made with ☕ and determination + the fact my grade depends on it

_A school project exploring modern web development_
