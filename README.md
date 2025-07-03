# 📝 Note Keeper — Frontend

A clean, responsive, and dark-mode-ready **Note Keeper frontend**, built with:

- ⚛️ **React** (with TypeScript)
- ⚡ **Vite** for fast development
- 🎨 **TailwindCSS** for utility-first styling
- 🌗 Dark mode support
- 📦 Yarn as the package manager

## ✍️ Rich Markdown Editing and Preview

Note Keeper provides full **Markdown support** for writing and viewing notes.

- 🧑‍💻 **Editing** is powered by [`@uiw/react-md-editor`](https://github.com/uiwjs/react-md-editor), offering a live preview and syntax highlighting.
- 🪄 **Rendering** uses [`react-markdown`](https://github.com/remarkjs/react-markdown), allowing safe, GitHub-flavored Markdown display in view mode.

### 💡 Features:

- Live markdown editor with syntax hints and toolbar
- GitHub-compatible markdown rendering
- Easy formatting for lists, code blocks, headings, links, and more
- Clean dark-mode support out of the box

## 🚀 Getting Started

### 🔧 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 20)
- [Yarn](https://yarnpkg.com/) (>= 1.22)

---

### 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/sepfrd/note-keeper.git
cd note-keeper
```

````

2. **Install dependencies:**

```bash
yarn install
```

3. **Set environment variables:**

Create a `.env` file in the root of the project:

```
VITE_HOST_URL="http://localhost:3000"
VITE_API_URL="https://sepfrd.com/note-keeper/api"
```

You can also directly use the **hosted backend** at:

```
https://sepfrd.com/note-keeper/api
```

> This backend is hosted by the author of this project and fully supports all expected endpoints.

4. **Run the development server:**

```bash
yarn dev
```

Then open your browser and navigate to:
👉 `http://localhost:3000`

---

## 🌓 Dark Mode

Dark mode is enabled by default. You can toggle themes using your browser or OS settings.

---

## 📁 Project Structure

```bash
note-keeper/
├── index.html                      # Root HTML template for Vite
├── package.json                    # Project metadata and dependencies
├── vite.config.ts                  # Vite configuration (build, env, plugins)
├── tsconfig.json                   # TypeScript configuration
├── .env                            # (Not committed) Contains API/host config
├── public/
│   ├── logo.svg                    # App logo
│   └── fonts/                      # Custom fonts (Comic Neue)
│       └── Comic_Neue/*.ttf
├── src/
│   ├── main.tsx                    # App entry point
│   ├── index.css                   # Tailwind and global styles
│   ├── App.tsx                     # Main app wrapper
│   ├── styles/global.css           # Additional base styles

│   ├── assets/icons/               # Static icons (e.g. Google logo)

│   ├── constants/                  # Constants like paths, messages, regex
│   │   ├── paths.ts                # Central route path definitions
│   │   ├── messages.ts             # Toast or form messages
│   │   └── regexPatterns.ts        # Validation regex patterns

│   ├── components/                 # Reusable UI components
│   │   ├── FormInput/              # Input field with label/icon
│   │   ├── LoginForm/              # Login form UI
│   │   ├── SignupForm/             # Signup form UI
│   │   ├── NoteCard/               # Note preview card
│   │   ├── NavBar/                 # Top navigation bar
│   │   ├── Loader/                 # Loading spinner
│   │   ├── GlobalToast/            # Toast container
│   │   ├── ProtectedRoute/         # Route guard logic
│   │   └── NoteEditorModal/        # Create/edit note in modal

│   ├── pages/                      # High-level views/pages
│   │   ├── Auth/                   # Login, Signup, OIDC callback
│   │   ├── Home/                   # Main landing page after login
│   │   ├── Notes/                  # View all notes
│   │   └── NewNote/                # Create new note

│   ├── contexts/                   # React Contexts (auth, loading, toast)

│   ├── providers/                  # Provider wrappers for context logic

│   ├── hooks/                      # Custom React hooks
│   │   └── useAuth.ts              # Hook to access auth context

│   ├── services/                   # API services
│   │   ├── apiClient.ts            # Axios setup
│   │   ├── authService.ts          # Login/signup/logout
│   │   └── noteService.ts          # Note CRUD operations

│   ├── types/                      # Shared TypeScript types

│   └── utils/                      # Utility helpers
│       ├── toastService.ts         # Toast display wrapper
│       └── validationHelper.ts     # Reusable field validation
```

---

## 🌐 Backend API

> You can use the author's hosted backend for convenience:

**🔗 https://sepfrd.com/note-keeper/api**

It's production-ready and maintained by the backend developer of this project (also the author).

If you want to self-host the backend, you can find the source and instructions [here](https://github.com/sepfrd/NoteKeeper).

---

## 📜 License

This project is open-source and available under the MIT License.

---

## ✨ Author

Made with ❤️ by [Sepehr](https://github.com/sepfrd)
````
