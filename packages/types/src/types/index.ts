import type { ButtonTokenMap } from './button/types';
import type { ModalTokenMap } from './modal/types';
import type { TextTokenMap } from './text/types';

export interface TokenRegistry {
  button: ButtonTokenMap;
  modal: ModalTokenMap;
  text: TextTokenMap;
}
