import type { ButtonTokenMap } from '@reactgrad/types/button';

const tailwindButtonMap: ButtonTokenMap = {
  base: 'px-4 py-2 rounded font-semibold transition',
  variants: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-300 text-black hover:bg-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  },
};

export default tailwindButtonMap;
