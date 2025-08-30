# Assignment

A modern React + TypeScript project powered by Vite, with Storybook, ESLint, TailwindCSS, and Vitest for testing.

## 📁 Folder Structure

```
assignment/
│
├── .storybook/           # Storybook configuration files
│   ├── main.ts
│   ├── preview.ts
│   └── vitest.setup.ts
│
├── public/               # Static assets served at root
│   └── vite.svg
│
├── src/                  # Source code
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   ├── assets/           # Project-specific assets
│   ├── components/       # Reusable UI components
│   │   ├── DataTable/
│   │   │   ├── DataTable.tsx
│   │   │   ├── DataTable.test.tsx
│   │   │   └── index.ts
│   │   └── InputField/
│   │       ├── InputField.tsx
│   │       ├── InputField.test.tsx
│   │       └── index.ts
│   └── stories/          # Storybook stories and related assets
│       ├── Button.stories.ts
│       ├── Header.stories.ts
│       ├── DataTable.stories.tsx
│       ├── InputField.stories.tsx
│       ├── assets/
│       └── ...
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.shims.d.ts
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/your-username/assignment.git
cd assignment
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start the development server

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 4. Run Storybook

```sh
npm run storybook
```

Storybook will be available at [http://localhost:6006](http://localhost:6006).

### 5. Run tests

```sh
npm run test
```

## 🛠️ Scripts

- `npm run dev` — Start the Vite development server
- `npm run build` — Build the app for production
- `npm run lint` — Run ESLint
- `npm run preview` — Preview the production build
- `npm run storybook` — Start Storybook for UI component development
- `npm run build-storybook` — Build Storybook static site

## 🧩 Tech Stack

- **React** & **TypeScript**
- **Vite** (build tool)
- **TailwindCSS** (utility-first CSS)
- **Storybook** (UI component explorer)
- **Vitest** (unit testing)
- **ESLint** (linting)

## 📦 Notes

- All dependencies are managed via `npm`.
- Static assets go in the `public/` folder.
- Component stories and documentation are in `src/stories/`.

---
