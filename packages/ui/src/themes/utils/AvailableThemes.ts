import type { TokenRegistry } from './types';
import tailwindTheme from '../presets/tailwind';

export const themes: Record<string, TokenRegistry> = {
  tailwind: tailwindTheme
};
