import React, { createContext, useContext } from 'react';
import type { TokenRegistry } from '@reactgrad/types';

// Don't provide any default registry!
const ThemeContext = createContext<TokenRegistry | null>(null);

export const ThemeProvider = ({
  children,
  tokens,
}: {
  children: React.ReactNode;
  tokens: TokenRegistry;
}) => {
  return (
    <ThemeContext.Provider value={tokens}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeTokens = (): TokenRegistry => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      '[ReactGrad] No theme tokens found. Did you forget to wrap your app in <ThemeProvider tokens={...} />?'
    );
  }
  return context;
};
