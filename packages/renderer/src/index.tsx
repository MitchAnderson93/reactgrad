import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// Shared UI package
import { ThemeProvider, componentMap, getThemeFromConfig } from '@reactgrad/ui';
import type { TokenRegistry } from '@reactgrad/ui';

// Render specific components based on type/configuration
export function RenderComponent({ type, props }: { type: string; props: any }) {
  const Component = componentMap[type];
  if (!Component) return <div style={{ color: 'red' }}>Unknown: {type}</div>;
  return <Component {...props} />;
}

// Render a page with its components
function Page({ components }: { components: any[] }) {
  return (
    <>
      {components.map((c, i) => (
        <RenderComponent key={i} {...c} />
      ))}
    </>
  );
}

// Main App Renderer that sets up the theme and routes
export function AppRenderer({ config }: { config: any }) {
  const [tokens, setTokens] = useState<TokenRegistry | null>(null);
  
  useEffect(() => {
    getThemeFromConfig(config.theme).then(setTokens);
  }, [config.theme]);

  if (!tokens) return <div>Loading theme…</div>;

  return (
    <ThemeProvider tokens={tokens}>
      <BrowserRouter>
        <Routes>
          {config.pages.map((page: any, i: number) => (
            <Route
              key={i}
              path={page.path}
              element={<Page components={page.components} />}
            />
          ))}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
