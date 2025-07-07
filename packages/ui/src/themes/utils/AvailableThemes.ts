import type { TokenRegistry } from '../../types';
import tailwindTheme from '../presets/tailwind';
import bootstrapTheme from '../presets/bootstrap';

export const themes: Record<string, TokenRegistry> = {
  tailwind: tailwindTheme,
  bootstrap: bootstrapTheme
};
