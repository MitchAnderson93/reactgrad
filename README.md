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
│   └── reactgrad-csr/      # Simple CSR react app using Vite
├── packages/      
│   └── ui/                 # Reusable UI elements across multiple /apps/
│   └── schema/             # Configuration as JSON
│   └── renderer/           # Renders from schema
├── turbo.json              # Turborepo pipeline config
├── pnpm-workspace.yaml 
└── package.json      
```

## Building your app:

```json
{
  "title": "ReactGrad Starter", // This will be utilised as metadata
  "description": "Build pixel-perfect react apps from JSON", // This will be utilised as metadata
  "theme": "bootstrap", // Theme support for 'default', 'bootstrap' and 'tailwind'
  "pages": [ // Pages required in the CSR app
    {
      "path": "/", // Path taxonomy 
      "components": [ // Desired components with type/prop maps 
        {
          "type": "Header",
          "props": {
            "text": "Welcome to ReactGrad"
          }
        },
        {
          "type": "Button",
          "props": {
            "to": "/about",
            "label": "Go to About Page"
          }
        },
        {
          "type": "Link", // Link as a component (also supported in button)
          "props": {
            "to": "/about", // Relates to known paths in configuration
            "label": "Go to About Page"
          }
        }
      ]
    },
    {
      "path": "/about",
      "components": [
        {
          "type": "Header",
          "props": {
            "text": "About This Project"
          }
        },
        {
          "type": "Link",
          "props": {
            "to": "/",
            "label": "Back to Home"
          }
        }
      ]
    }
  ]
}
```

## 📦 Commands:

### Monorepo:
```
Global monorepo:

pnpm run dev                            # Run all
pnpm test	                            # Run tests across all packages
```

### Packages:
```
# Build schema
pnpm --filter @reactgrad/schema build   

# Run UI tests
pnpm --filter @reactgrad/ui test
```

