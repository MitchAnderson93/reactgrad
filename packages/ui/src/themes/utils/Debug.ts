console.log('Raw VITE_DEBUG:', import.meta.env.VITE_DEBUG);
console.log('Type:', typeof import.meta.env.VITE_DEBUG);
console.log('All env vars:', import.meta.env);

// Try multiple ways to check for true
const isDebug = import.meta.env.VITE_DEBUG === 'true' || 
                import.meta.env.VITE_DEBUG === true ||
                import.meta.env.VITE_DEBUG === 'TRUE';

if (isDebug) console.log('Debug enabled:', isDebug);

export const debug = {
  log: (...args: any[]) => {
    if (isDebug) console.log('[ReactGrad Debug]', ...args);
  },
  error: (...args: any[]) => {
    if (isDebug) console.error('[ReactGrad Error]', ...args);
  },
  warn: (...args: any[]) => {
    if (isDebug) console.warn('[ReactGrad Warning]', ...args);
  }
};