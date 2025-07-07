import React, { useState } from 'react';
import { componentMap } from '@reactgrad/ui';

// Actions in page
import { ActionHandler } from './ActionHandler';
import type { ComponentConfig, Action } from '../types/actions';

interface PageProps {
  components: ComponentConfig[];
}

// Render a page with its components
export function Page({ components }: PageProps) {
  const [activeAction, setActiveAction] = useState<Action | null>(null);

  const renderComponent = (component: ComponentConfig, index: number) => {
    const Component = componentMap[component.type];

    if (!Component) {
      console.warn(`[ReactGrad] Unknown component type: ${component.type}`);
      return React.createElement('div', { key: index }, `Unknown component: ${component.type}`);
    }

    // Add action handler to props if component has an action
    const props = { ...component.props };
    if (component.action) {
      props.onAction = () => setActiveAction(component.action!);
    }

    return React.createElement(Component, { key: component.id || index, ...props });
  };

  const children: React.ReactNode[] = [
    ...components.map(renderComponent),
    activeAction ? React.createElement(ActionHandler, {
      key: 'action-handler',
      action: activeAction,
      onClose: () => setActiveAction(null)
    }) : null
  ].filter(Boolean);

  return React.createElement('div', {}, ...children);
}