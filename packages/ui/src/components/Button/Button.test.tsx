import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Button } from '.';
import { ThemeProvider } from '../../themes/ThemeProvider';
import tailwindTheme from '../../themes/presets/tailwind';
import bootstrapTheme from '../../themes/presets/bootstrap';
import { vi } from 'vitest';

const themes = [
  { name: 'Tailwind', theme: tailwindTheme },
  { name: 'Bootstrap', theme: bootstrapTheme },
];

describe('Button Component', () => {
  themes.forEach(({ name, theme }) => {
    describe(`with ${name} theme`, () => {
      const ButtonWithProviders = ({ children }: { children: React.ReactNode }) => (
        <BrowserRouter>
          <ThemeProvider tokens={theme}>
            {children}
          </ThemeProvider>
        </BrowserRouter>
      );

      it('renders with the provided label', () => {
        render(
          <ButtonWithProviders>
            <Button label="Test Button" />
          </ButtonWithProviders>
        );
        
        expect(screen.getByRole('button', { name: /test button/i })).toBeInTheDocument();
      });

      it('handles click events', () => {
        const handleClick = vi.fn();
        
        render(
          <ButtonWithProviders>
            <Button label="Click Me" onClick={handleClick} />
          </ButtonWithProviders>
        );
        
        fireEvent.click(screen.getByRole('button', { name: /click me/i }));
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it('renders as a link when "to" prop is provided', () => {
        render(
          <ButtonWithProviders>
            <Button label="Go to About" to="/about" />
          </ButtonWithProviders>
        );
        
        const linkElement = screen.getByRole('link', { name: /go to about/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/about');
      });

      it('applies the correct variant classes', () => {
        render(
          <ButtonWithProviders>
            <Button label="Primary Button" variant="primary" />
          </ButtonWithProviders>
        );
        
        const button = screen.getByRole('button', { name: /primary button/i });
        // Theme-agnostic test - just check that variant classes are applied
        expect(button).toHaveClass(theme.button.variants.primary);
      });

      it('applies custom className', () => {
        render(
          <ButtonWithProviders>
            <Button label="Custom Button" className="custom-class" />
          </ButtonWithProviders>
        );
        
        const button = screen.getByRole('button', { name: /custom button/i });
        expect(button).toHaveClass('custom-class');
      });

      it('sets the correct button type', () => {
        render(
          <ButtonWithProviders>
            <Button label="Submit Button" type="submit" />
          </ButtonWithProviders>
        );
        
        const button = screen.getByRole('button', { name: /submit button/i });
        expect(button).toHaveAttribute('type', 'submit');
      });
    });
  });

  it('shows error message when theme tokens are missing', () => {
    const emptyTokens = {} as any; // Empty tokens to test error case
    
    render(
      <BrowserRouter>
        <ThemeProvider tokens={emptyTokens}>
          <Button label="Test Button" />
        </ThemeProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Button theme tokens missing')).toBeInTheDocument();
  });
});