export interface BaseAction {
  type: string;
}

export interface ModalAction extends BaseAction {
  type: 'Modal';
  title: string;
  fetch?: {
    url: string;
  };
  response?: {
    target: string;
  };
  components: ComponentConfig[];
}

export interface NavigateAction extends BaseAction {
  type: 'Navigate';
  to: string;
}

export type Action = ModalAction | NavigateAction;

export interface ComponentConfig {
  id?: string;
  type: string;
  props: Record<string, any>;
  action?: Action;
}