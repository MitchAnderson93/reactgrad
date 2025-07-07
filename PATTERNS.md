# Schema and patterns
- The 'schema' is the document that drives a reactgrad app's functionality (csr or ssr)
- A 'pattern' is a sub JSON structure that consists of pages, components and actions.

## How to use app schema
```tsx
import schema from '@reactgrad/schema';
import { AppRenderer } from '@reactgrad/renderer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRenderer config={schema} />
  </StrictMode>,
)
```

## Getting started:
```bash
# Builds config from @reactgrad/ui/src/app-schema.json to package dist
pnpm run build:config 
# Leave this running as build:config will auto update:
pnpm run dev
```

SEE: [./packages/schema/src/examples/kitchensink.json]

## Pages and navigation (top level):
```
{
  "pages": [
    {
        "path": "/", # Default first route
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
      "path": "/about", # Second page
      "components": [ 
        {
          "type": "Link",
          "props": {
            "to": "/",
            "label": "Back"
          }
        }
      ]
    }
    ...
  ]
}
```

## 2. Individual components (all):
```
{
    "components": [
        {
            "id": "header",                         # Optional target can be applied to any component. See next section.
            "type": "Header",                       # Header component
            "props": {                              # Must include props
                "text": "Welcome to ReactGrad"      # See Header text in designs
            }
        },
        {
            "type": "Button",                       # Standard button
            "props": {                              # Must include props
                "to": "/about"                      # Used as navigation e.g. "to": "/page"
                "variant": "primary",               # Buttons accept multiple variants
                "label": "Launch modal"             # Label used as text
            }
        },
        {
            "type": "Link",                         # Use Link in text where a button is not appropriate.
            "props": {                              # Must include props
                "to": "/about",                     # Used as navigation
                "label": "Go to About Page"         # Label used as text
            }
        },
        {
            "type": "Text",
            "content": [                            # Text can accept array of paragraphs as objects
                {                               
                    "Lorem ipsum 1"
                },
                {                               
                    "Lorem ipsum 2"
                },
                {                               
                    "Learn more",
                    "props": {

                    }
                }
            ]
            "props": {
                "to": "/about",
                "label": "Go to About Page"
            }
        }
    ]
}
```

## Actions (all):
- Must include "action" as component property
- Can conflict with "to" prop (navigation) if intended to perform a UI action

### 1. Button to launch modal with API response:
Must be used by component: Button

```
"
{
  "pages": [
        {
            "path": "/",                                    # Example page
            "components": [ 
                {
                    "type": "Button",                       # Standard button
                    "props": {},                            # No prop.to present (conflicts)
                    "action": {                             # action property
                        "type": "Modal",                    # Modal component as action
                        "title": "List from API",           # accepts title
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
            ]
        }
    ]
}
```