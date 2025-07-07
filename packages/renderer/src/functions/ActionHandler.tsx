import React, { useState } from 'react';
import type { Action, ModalAction } from '../types/actions';
import { Modal } from '@reactgrad/ui';
import { Page } from './Page';

interface ActionHandlerProps {
  action: Action;
  onClose?: () => void;
}

export function ActionHandler({ action, onClose }: ActionHandlerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleModalAction = async (modalAction: ModalAction) => {
    if (modalAction.fetch) {
      setIsLoading(true);
      try {
        // Mock API call for now - you can implement real fetch logic
        const response = await fetch(modalAction.fetch.url);
        const result = await response.json();
        setData(result);
        
        // Update target component if specified
        if (modalAction.response?.target) {
          // Find and update the target component
          // This would need more sophisticated state management
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  switch (action.type) {
    case 'Modal':
      return React.createElement(Modal, {
        isOpen: true,
        onClose: onClose,
        title: action.title,
        children: React.createElement(Page, { components: action.components })
      });
    
    case 'Navigate':
      // Handle navigation - this could use react-router's navigate
      return null;
    
    default:
      return null;
  }
}