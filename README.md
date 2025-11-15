# File & Folder Manager

A modern, performant file and folder tree structure manager built with React. Create, organize, and manage nested folders and files with an intuitive UI.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 📁 **Nested Folder Structure** - Create unlimited nested folders and files
- ✅ **Smart Checkbox Selection** - Parent-child checkbox synchronization with automatic propagation
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- ⚡ **High Performance** - Optimized with React.memo, useCallback, and path-based updates
- 🔄 **Expand/Collapse** - Toggle folder visibility with a single click
- 🚀 **Fast Updates** - Path-based algorithms for efficient tree updates
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎯 **Zero Dependencies** - Pure React implementation, no external UI libraries

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.2.2** - Build tool and dev server
- **React Context API** - State management without prop drilling
- **CSS3** - Modern styling with gradients and animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd parentchildstructure
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

1. **Add a Folder**: Click the "+ 📁" button on any folder to add a new subfolder
2. **Add a File**: Click the "+ 📄" button on any folder to add a new file
3. **Expand/Collapse**: Click the chevron (▶) icon to expand or collapse folders
4. **Checkbox Selection**: 
   - Check a folder to automatically select all its children
   - Check all children to automatically select the parent
   - Uncheck any item to automatically uncheck its parent
5. **Nested Structure**: Create unlimited levels of nested folders and files

## 🏗️ Project Structure

```
parentchildstructure/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── vercel.json          # Vercel deployment configuration
└── package.json         # Project dependencies
```

## ⚡ Performance Optimizations

This project implements several performance optimizations:

- **React.memo** - Prevents unnecessary re-renders of tree nodes
- **useCallback** - Stable function references to maintain memoization
- **Context API** - Eliminates prop drilling for better performance
- **Path-based Updates** - Efficient tree updates using path arrays instead of full tree traversal
- **Lazy Path Computation** - Paths computed only when needed, not stored in memory

### Update Complexity

- **Tree Updates (Add/Remove/Toggle)**: O(depth) - Only updates nodes along the path
- **Checkbox Selection**: O(descendants) + O(depth × siblings) - Updates all descendants and checks siblings at each parent level
  - This complexity is inherent to the requirement of parent-child synchronization
  - Path-based approach ensures we only update the affected branch, not the entire tree

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and deploy automatically

The project includes a `vercel.json` configuration for SPA routing.

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Code Architecture

### Core Components

- **TreeNode** - Memoized component for rendering tree nodes
- **TreeContext** - Context provider for tree state and callbacks
- **updateTreeByPath** - Path-based tree update function

### Key Functions

- `updateTreeByPath(tree, path, updater)` - Updates tree using path array (O(depth) complexity)
- `generateId()` - Generates unique IDs for nodes using timestamp and random string
- `handleAddFolderOrFile(path, type)` - Adds new folder or file to the tree
- `handleToggleExpand(path, e)` - Toggles folder expand/collapse state
- `handleCheckToggle(path, e)` - Handles checkbox selection with parent-child propagation
- `updateAllDescendants(node, checked)` - Recursively updates node and all its descendants

## 🎨 UI Features

- Gradient background with modern color scheme
- Smooth hover effects and transitions
- Icon-based visual hierarchy (📁 folders, 📄 files)
- Responsive button actions that appear on hover
- Visual indentation for nested levels

## 🔮 Future Enhancements

- [x] Checkbox selection with parent-child synchronization
- [ ] Rename folders and files
- [ ] Delete folders and files
- [ ] Drag and drop reordering
- [ ] Search functionality
- [ ] Export/Import tree structure
- [ ] Persist state to localStorage
- [ ] Dark mode toggle
- [ ] Indeterminate checkbox state (partial selection)

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React and Vite
