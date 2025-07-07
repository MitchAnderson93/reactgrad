import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// Importing the Page component that renders the components for each page
import { Page } from './functions/Page';

// Shared UI package
import { ThemeProvider, getThemeFromConfig } from '@reactgrad/ui';
import type { TokenRegistry } from '@reactgrad/ui';

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
