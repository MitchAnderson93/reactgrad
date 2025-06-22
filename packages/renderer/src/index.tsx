import React from 'react';
import { componentMap } from '@reactgrad/ui';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

export function RenderComponent({ type, props }: { type: string; props: any }) {
  const Component = componentMap[type];
  if (!Component) return <div style={{ color: 'red' }}>Unknown: {type}</div>;
  return <Component {...props} />;
}

function Page({ components }: { components: any[] }) {
  return (
    <>
      {components.map((c, i) => (
        <RenderComponent key={i} {...c} />
      ))}
    </>
  );
}

export function AppRenderer({ config }: { config: any }) {
  return (
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
  );
}
