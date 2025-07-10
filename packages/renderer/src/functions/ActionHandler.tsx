import React, { useState, useEffect } from 'react';
import type { Action, ModalAction } from '../types/actions';

// Page functionality
import { Page } from './Page';

// Component in use in this file
import { Modal } from '@reactgrad/ui';

// ActionHandlerProps defines the props for the ActionHandler component
interface ActionHandlerProps {
  action: Action;
  onClose?: () => void;
}

// ActionHandler is a React component that handles different types of actions that occur from components in current page
export function ActionHandler({ action, onClose }: ActionHandlerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  
  // Only initialize components if action has components (i.e., it's a ModalAction)
  const [components, setComponents] = useState(
    'components' in action ? action.components || [] : []
  );

  useEffect(() => {
    if (action.type === 'Modal' && 'fetch' in action && action.fetch) {
      handleModalFetch(action as ModalAction);
    }
  }, [action]);

  const handleModalFetch = async (modalAction: ModalAction) => {
    if (modalAction.fetch) {
      setIsLoading(true);
      try {
        const response = await fetch(modalAction.fetch.url);
        const result = await response.json();
        setData(result);
        
        // Update target component if specified
        if (modalAction.response?.target && modalAction.components) {
          updateTargetComponent(modalAction.response.target, result, modalAction.components);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        
        // Update with error message
        if (modalAction.response?.target && modalAction.components) {
          updateTargetComponent(modalAction.response.target, 'Failed to load data', modalAction.components);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateTargetComponent = (target: string, newData: any, originalComponents: any[]) => {
    // Parse target like "loadingBox.data" -> { id: "loadingBox", prop: "data" }
    const [targetId, targetProp] = target.split('.');
    const updatedComponents = originalComponents.map(component => {
      if (component.id === targetId) {
        return {
          ...component,
          props: {
            ...component.props,
            [targetProp]: newData
          }
        };
      }
      return component;
    });
    
    setComponents(updatedComponents);
  };

  switch (action.type) {
    // Primary case. Button > Modal with API fetch
    case 'Modal':
      const modalAction = action as ModalAction;
      return React.createElement(Modal, {
        isOpen: true,
        onClose: onClose,
        title: modalAction.title,
        children: React.createElement(Page, { 
          components: components // Use updated components with API data
        })
      });
    
    case 'Navigate':
      // Handle navigation - this could use react-router's navigate
      return null;
    
    default:
      return null;
  }
}