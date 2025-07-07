# 🚀 ReactGrad starter

A modern monorepo boilerplate for rapidly building internal business web apps using **React**, **TypeScript**, **Vite**, **pnpm**, and **Turborepo**.

Ideal for onboarding grad-level engineers into building pixel-perfect apps driven by a JSON schema.

---

## 🧱 Tech stack

| Tool             | Purpose                                   |
|------------------|--------------------------------------------|
| [React](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vitejs.dev/) | Lightning-fast dev server & bundler |
| [pnpm](https://pnpm.io/) | Monorepo-friendly package manager |
| [Turborepo](https://turbo.build/repo) | Task orchestration across apps/packages |

---

## 📁 Folder structure

```txt
your-fork/
├── apps/
│   └── reactgrad-csr/      # Simple CSR react app
├── packages/      
│   └── ui/                 # Reusable UI elements across /apps/
│   └── schema/             # Configuration as JSON
│   └── renderer/           # Renders from schema
├── turbo.json              # Turborepo pipeline config
├── pnpm-workspace.yaml 
└── package.json      
```

## 📦 Commands:

### Start a new app:
```
pnpm gen
```

### Build schema
```
pnpm build:config
```

### Run UI tests
```
pnpm --filter @reactgrad/ui test
```