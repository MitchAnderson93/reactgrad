import type { TokenRegistry } from './types';

export async function getThemeFromConfig(theme: string | TokenRegistry): Promise<TokenRegistry> {
  if (typeof theme !== 'string') return theme;

  switch (theme) {
    case 'default':
    case 'bootstrap':
      await import('../presets/bootstrap/style.scss');
      return (await import('../presets/bootstrap')).default;
    case 'tailwind':
      await import('../presets/tailwind/style.scss');
      return (await import('../presets/tailwind')).default;
    default:
      throw new Error(`[ReactGrad] Unknown theme "${theme}". Available: default, bootstrap and tailwind.`);
  }
}
