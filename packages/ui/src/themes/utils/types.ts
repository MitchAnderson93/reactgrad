import type { ButtonTokenMap } from '../../types/button/types';
import type { ModalTokenMap } from '../../types/modal/types';

export interface TokenRegistry {
  button: ButtonTokenMap;
  modal: ModalTokenMap;
}
