# 📋 Schema and Patterns

**ReactGrad** apps are driven by JSON schemas that define pages, components, and actions. This document outlines the patterns and conventions for building schema-driven applications.

## 📚 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [📄 Schema Structure](#-schema-structure)
- [🗺️ Pages and Navigation](#️-pages-and-navigation)
- [🧩 Components](#-components)
- [⚡ Actions](#-actions)
- [📖 Examples](#-examples)

---

## 🚀 Quick Start

### Using the App Schema
```tsx
import schema from '@reactgrad/schema';
import { AppRenderer } from '@reactgrad/renderer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRenderer config={schema} />
  </StrictMode>,
)
```

### Development Workflow
```bash
# Build config from schema JSON to package dist
pnpm run build:config 

# Start development server (auto-rebuilds on schema changes)
pnpm run dev
```

> 💡 **See Example**: [kitchensink.json](./packages/schema/src/examples/kitchensink.json)

---

## 📄 Schema Structure

A **schema** is the JSON document that drives your app's functionality. It contains:
- **Pages** - Route definitions and navigation
- **Components** - UI elements and their properties  
- **Actions** - Interactive behaviors (modals, API calls, etc.)

---

## 🗺️ Pages and Navigation

Define routes and page content using the `pages` array:

```json
{
  "pages": [
    {
      "path": "/",
      "components": [
        {
          "type": "Link",
          "props": {
            "to": "/about",
            "label": "Go to About page"
          }
        }
      ]
    },
    {
      "path": "/about",
      "components": [
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

---

## 🧩 Components

All UI elements are defined in the `components` array:

### Header Component
```json
{
  "id": "header",
  "type": "Header",
  "props": {
    "text": "Welcome to ReactGrad"
  }
}
```

### Button Component
```json
{
  "type": "Button",
  "props": {
    "variant": "primary",
    "label": "Click me",
    "to": "/about"
  }
}
```

### Link Component
```json
{
  "type": "Link",
  "props": {
    "to": "/about",
    "label": "Go to About Page"
  }
}
```

### Text Component
```json
{
  "type": "Text",
  "content": [
    "First paragraph of content",
    "Second paragraph of content",
    {
      "text": "Learn more",
      "props": {
        "to": "/docs"
      }
    }
  ]
}
```

### Component Properties

| Property | Description | Required |
|----------|-------------|----------|
| `type` | Component name (Button, Link, Text, etc.) | ✅ |
| `props` | Component-specific properties | ✅ |
| `id` | Unique identifier for targeting | ❌ |
| `action` | Interactive behavior definition | ❌ |

---

## ⚡ Actions

Actions define interactive behaviors that components can trigger.

> ⚠️ **Note**: `action` conflicts with `to` prop (navigation)

### Modal with API Data

Launch a modal that fetches and displays API data:

```json
{
  "type": "Button",
  "props": {
    "label": "Show API Data",
    "variant": "primary"
  },
  "action": {
    "type": "Modal",
    "title": "List from API",
    "fetch": {
      "url": "opendata:api/example"
    },
    "response": {
      "target": "loadingBox.content"
    },
    "components": [
      {
        "id": "loadingBox",
        "type": "Text",
        "props": {
          "content": "Loading..."
        }
      }
    ]
  }
}
```

### Action Properties

| Property | Description | Example |
|----------|-------------|---------|
| `type` | Action type (Modal, etc.) | `"Modal"` |
| `title` | Action title/heading | `"API Results"` |
| `fetch` | API endpoint configuration | `{"url": "api/data"}` |
| `response` | Response handling | `{"target": "id.property"}` |
| `components` | Action-specific components | `[{...}]` |

---

## 📖 Examples

### Complete Page Example
```json
{
  "pages": [
    {
      "path": "/dashboard",
      "components": [
        {
          "type": "Header",
          "props": {
            "text": "Dashboard"
          }
        },
        {
          "type": "Button",
          "props": {
            "label": "Load Data",
            "variant": "primary"
          },
          "action": {
            "type": "Modal",
            "title": "User Data",
            "fetch": {
              "url": "api/users"
            },
            "components": [
              {
                "type": "Text",
                "props": {
                  "content": "Loading users..."
                }
              }
            ]
          }
        }
      ]
    }
  ]
}
```

### Navigation Example
```json
{
  "components": [
    {
      "type": "Link",
      "props": {
        "to": "/",
        "label": "Home"
      }
    },
    {
      "type": "Button",
      "props": {
        "to": "/settings",
        "label": "Settings",
        "variant": "secondary"
      }
    }
  ]
}
```

---

> 📝 **Need help?** Check out the [main README](./README.md) for setup instructions and development commands.