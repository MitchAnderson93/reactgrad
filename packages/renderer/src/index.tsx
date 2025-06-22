import { componentMap } from '@reactgrad/ui';

export function RenderComponent({ type, props }: { type: string; props: any }) {
  const Component = componentMap[type];
  if (!Component) return <div style={{ color: 'red' }}>Unknown component: {type}</div>;
  return <Component {...props} />;
}

export function AppRenderer({ config }: { config: any }) {
  return (
    <div>
      {config.pages.map((page: any, i: number) => (
        <div key={i}>
          {page.components.map((c: any, j: number) => (
            <RenderComponent key={j} {...c} />
          ))}
        </div>
      ))}
    </div>
  );
}