export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonTokenMap {
  base: string;
  variants: Record<ButtonVariant, string>;
}
