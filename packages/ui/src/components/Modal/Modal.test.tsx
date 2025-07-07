import React from 'react';
<<<<<<< HEAD
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../themes/ThemeProvider';

// Component
import { Modal } from '.';

// Themes
// Importing themes directly from the presets
import tailwindTheme from '../../themes/presets/tailwind';
import bootstrapTheme from '../../themes/presets/bootstrap';
=======
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '.';
import { ThemeProvider } from '../../themes/ThemeProvider';
import tailwindTheme from '../../themes/presets/tailwind';
import bootstrapTheme from '../../themes/presets/bootstrap';
import { vi } from 'vitest';

>>>>>>> 7354c7f (WIP:DEV - Recent updates supporting multiple themes  (#2))
const themes = [
  { name: 'Tailwind', theme: tailwindTheme },
  { name: 'Bootstrap', theme: bootstrapTheme },
];

<<<<<<< HEAD
// Test suite for Modal component
=======
>>>>>>> 7354c7f (WIP:DEV - Recent updates supporting multiple themes  (#2))
describe('Modal Component', () => {
  themes.forEach(({ name, theme }) => {
    describe(`with ${name} theme`, () => {
      const ModalWithTheme = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider tokens={theme}>
          {children}
        </ThemeProvider>
      );

      it('renders when isOpen is true', () => {
        render(
          <ModalWithTheme>
            <Modal isOpen={true} title="Test Modal">
              <p>Modal content</p>
            </Modal>
          </ModalWithTheme>
        );
        
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Modal content')).toBeInTheDocument();
      });

      it('does not render when isOpen is false', () => {
        render(
          <ModalWithTheme>
            <Modal isOpen={false} title="Test Modal">
              <p>Modal content</p>
            </Modal>
          </ModalWithTheme>
        );
        
        expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
      });

      it('calls onClose when backdrop is clicked', () => {
        const onClose = vi.fn();
        
        render(
          <ModalWithTheme>
            <Modal isOpen={true} onClose={onClose} title="Test Modal">
              <p>Modal content</p>
            </Modal>
          </ModalWithTheme>
        );
        
        // Use theme-agnostic test ID (added to base component)
        const backdrop = screen.getByTestId('modal-backdrop');
        fireEvent.click(backdrop);
        
        expect(onClose).toHaveBeenCalled();
      });

      it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn();
        
        render(
          <ModalWithTheme>
            <Modal isOpen={true} onClose={onClose} title="Test Modal">
              <p>Modal content</p>
            </Modal>
          </ModalWithTheme>
        );
        
        // Use theme-agnostic test ID (added to base component)
        const closeButton = screen.getByTestId('modal-close-button');
        fireEvent.click(closeButton);
        
        expect(onClose).toHaveBeenCalled();
      });

      it('calls onClose when close button is clicked by aria-label', () => {
        const onClose = vi.fn();
        
        render(
          <ModalWithTheme>
            <Modal isOpen={true} onClose={onClose} title="Test Modal">
              <p>Modal content</p>
            </Modal>
          </ModalWithTheme>
        );
        
        // Use semantic selector (aria-label)
        const closeButton = screen.getByLabelText('Close');
        fireEvent.click(closeButton);
        
        expect(onClose).toHaveBeenCalled();
      });

      it('shows error message when theme tokens are missing', () => {
        const emptyTokens = {} as any;
        
        render(
          <ThemeProvider tokens={emptyTokens}>
            <Modal isOpen={true} title="Test Modal">
              <p>Modal content</p>
            </Modal>
          </ThemeProvider>
        );
        
        expect(screen.getByText('Modal theme tokens missing')).toBeInTheDocument();
      });
    });
  });
});