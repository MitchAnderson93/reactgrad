import type { TokenRegistry } from './types';

export async function getThemeFromConfig(theme: string | TokenRegistry): Promise<TokenRegistry> {
  if (typeof theme !== 'string') return theme;

  switch (theme) {
    case 'default':
      return (await import('../presets/tailwind')).default; // Default to tailwind for now
    case 'bootstrap':
      return (await import('../presets/bootstrap')).default;
    case 'tailwind':
      return (await import('../presets/tailwind')).default;
    default:
      throw new Error(`[ReactGrad] Unknown theme "${theme}". Available: tailwind, bootstrap`);
  }
}
