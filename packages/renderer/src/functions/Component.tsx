// Shared UI package
import { componentMap } from '@reactgrad/ui';

// Render specific components based on type/configuration
export function RenderComponent({ type, props }: { type: string; props: any }) {
  const Component = componentMap[type];
  if (!Component) return <div style={{ color: 'red' }}>Unknown: {type}</div>;
  return <Component {...props} />;
}