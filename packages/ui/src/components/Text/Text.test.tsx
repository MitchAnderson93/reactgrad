import React from 'react';
import { render, screen } from '@testing-library/react';

// Component
import { Text } from '.';

// Themes
import { ThemeProvider } from '../../themes/ThemeProvider';
import tailwindTheme from '../../themes/presets/tailwind';
import bootstrapTheme from '../../themes/presets/bootstrap';
const themes = [
  { name: 'Tailwind', theme: tailwindTheme },
  { name: 'Bootstrap', theme: bootstrapTheme },
];

// Test suite for Text component
describe('Text Component', () => {
  themes.forEach(({ name, theme }) => {
    describe(`with ${name} theme`, () => {
      const TextWithTheme = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider tokens={theme}>
          {children}
        </ThemeProvider>
      );

      it('renders with string content', () => {
        render(
          <TextWithTheme>
            <Text content="Hello World" />
          </TextWithTheme>
        );
        
        expect(screen.getByText('Hello World')).toBeInTheDocument();
      });

      it('renders with array content', () => {
        const content = ['First paragraph', 'Second paragraph'];
        
        render(
          <TextWithTheme>
            <Text content={content} />
          </TextWithTheme>
        );
        
        expect(screen.getByText('First paragraph')).toBeInTheDocument();
        expect(screen.getByText('Second paragraph')).toBeInTheDocument();
      });

      it('renders API data as formatted list', () => {
        const apiData = [
          {
            id: '1',
            name: 'Test Item',
            data: {
              color: 'Red',
              size: 'Large'
            }
          }
        ];
        
        render(
          <TextWithTheme>
            <Text data={apiData} />
          </TextWithTheme>
        );
        
        expect(screen.getByText('Test Item')).toBeInTheDocument();
        expect(screen.getByText(/color:/)).toBeInTheDocument();
        expect(screen.getByText(/Red/)).toBeInTheDocument();
        expect(screen.getByText(/size:/)).toBeInTheDocument();
        expect(screen.getByText(/Large/)).toBeInTheDocument();
      });

      it('renders single object as JSON', () => {
        const singleObject = { name: 'Test', value: 123 };
        
        render(
          <TextWithTheme>
            <Text data={singleObject} />
          </TextWithTheme>
        );
        
        // Check that JSON is rendered (should contain the object data)
        expect(screen.getByText(/"name"/)).toBeInTheDocument();
        expect(screen.getByText(/"Test"/)).toBeInTheDocument();
        expect(screen.getByText(/123/)).toBeInTheDocument();
      });

      it('applies custom className', () => {
        render(
          <TextWithTheme>
            <Text content="Test content" className="custom-class" />
          </TextWithTheme>
        );
        
        const textElement = screen.getByText('Test content').closest('div');
        expect(textElement).toHaveClass('custom-class');
      });

      it('prioritizes data over content when both are provided', () => {
        const testData = [{ id: '1', name: 'Data Item' }];
        
        render(
          <TextWithTheme>
            <Text content="This should not show" data={testData} />
          </TextWithTheme>
        );
        
        expect(screen.getByText('Data Item')).toBeInTheDocument();
        expect(screen.queryByText('This should not show')).not.toBeInTheDocument();
      });
    });
  });

  it('shows error message when theme tokens are missing', () => {
    const emptyTokens = {} as any;
    
    render(
      <ThemeProvider tokens={emptyTokens}>
        <Text content="Test content" />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Text theme tokens missing')).toBeInTheDocument();
  });
});