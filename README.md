# 🚀 ReactGrad Starter

A modern monorepo boilerplate for rapidly building internal business web apps using **React**, **TypeScript**, **Vite**, **pnpm**, and **Turborepo**.

Ideal for onboarding grad-level engineers into building pixel-perfect apps driven by a JSON schema.

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

## 📁 Folder Structure

```txt
reactgrad-starter/
├── apps/
│   └── reactgrad-csr/      # Simple CSR react app using Vite
├── packages/      
│   └── ui/                 # Reusable UI elements across multiple /apps/
│   └── schema/             # Configuration as JSON
│   └── renderer/           # Renders from schema
├── turbo.json              # Turborepo pipeline config
├── pnpm-workspace.yaml 
└── package.json      
```

## 📦 Commands:
```
Apps:
pnpm run dev
```

```
Utilities:
pnpm test	                    # Run tests across all packages
```