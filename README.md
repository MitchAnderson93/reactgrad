# 🚀 ReactGrad starter

A modern monorepo boilerplate for rapidly building internal business web apps using **React**, **TypeScript**, **Vite**, **pnpm**, and **Turborepo**.

Ideal for onboarding grad-level engineers into building pixel-perfect apps driven by a JSON schema.

## 📚 On this page:

- [🧱 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🛠️ Development Commands](#️-development-commands)
- [🚀 Quick Start](#-quick-start)
- [📖 Documentation](#-documentation)

---

## 🧱 Tech Stack

| Tool             | Purpose                                   |
|------------------|--------------------------------------------|
| [React](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vitejs.dev/) | Lightning-fast dev server & bundler |
| [pnpm](https://pnpm.io/) | Monorepo-friendly package manager |
| [Turborepo](https://turbo.build/repo) | Task orchestration across apps/packages |

---

## 📁 Project Structure

```
reactgrad-dev/
├── 📱 apps/
│   └── reactgrad-csr/          # Client-side React application
├── 📦 packages/
│   ├── ui/                     # Shared UI components & themes
│   ├── schema/                 # JSON configuration schemas
│   └── renderer/               # Schema-to-component renderer
├── ⚙️  turbo.json              # Turborepo build pipeline
├── 📋 pnpm-workspace.yaml      # Workspace configuration
└── 📄 package.json             # Root dependencies
```

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `pnpm gen` | 🆕 Generate a new application |
| `pnpm build:config` | 🔧 Build configuration schema |
| `pnpm dev` | 🚀 Start development server |
| `pnpm test:ui` | ✅ Run UI component tests |
| `pnpm build` | 📦 Build all packages |
| `pnpm lint` | 🔍 Lint all code |

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test
```

## 📖 Documentation

- **[Development Patterns](./PATTERNS.md)** - Coding standards, theme architecture, and best practices
- **Component Library** - Browse available UI components in `/packages/ui/src/components`
- **Theme System** - Multi-theme support for Bootstrap and Tailwind CSS