import type { ModalTokenMap } from '@reactgrad/types/modal';

const tailwindModalMap: ModalTokenMap = {
  backdrop: 'fixed inset-0 bg-black bg-opacity-50 z-40',
  container: 'fixed inset-0 z-50 flex items-center justify-center',
  content: 'relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4',
  header: 'flex justify-between items-center p-4 border-b',
  title: 'text-xl font-semibold text-gray-900',
  closeButton: 'text-gray-400 hover:text-gray-600 text-2xl leading-none p-1',
};

export default tailwindModalMap;