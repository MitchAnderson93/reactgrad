import React from 'react';
import { useThemeTokens } from '../../themes/ThemeProvider';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const tokens = useThemeTokens();

  if (!isOpen) return null;

  // Add error handling for missing modal tokens
  if (!tokens.modal) {
    console.error('[ReactGrad] Modal tokens not found in theme');
    return <div style={{ color: 'red' }}>Modal theme tokens missing</div>;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={tokens.modal.backdrop}
        onClick={onClose}
        data-testid="modal-backdrop"
      />
      
      {/* Modal Container */}
      <div className={tokens.modal.container} tabIndex={-1}>
        <div className={tokens.modal.content}>
          <div className="modal-content">
            {title && (
              <div className={tokens.modal.header}>
                <h5 className={tokens.modal.title}>{title}</h5>
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className={tokens.modal.closeButton}
                    aria-label="Close"
                    data-testid="modal-close-button"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
            
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};