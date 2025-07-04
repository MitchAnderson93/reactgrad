import type { TokenRegistry } from '../../utils/types';
const modules = import.meta.glob('./maps/**/*.ts', { eager: true });

// Debug
import { debug } from '../../utils/Debug';
debug.log('Dynamic imports:', modules);

const theme: TokenRegistry = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    // Extract the folder name (component type) from the path
    // Example: './maps/button/index.ts' -> 'button'
    const matches = path.match(/\.\/maps\/([^\/]+)\//);
    const key = matches ? matches[1] : path.split('/').pop()?.replace(/\.(ts|js)$/, '');
    
    debug.log(`Mapping path "${path}" to key "${key}"`, (mod as any).default);
    return [key, (mod as any).default];
  })
) as TokenRegistry;

debug.log('Final theme object:', theme);
export default theme;
