import { Header } from './';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  it('renders the provided text', () => {
    render(<Header text="Hello ReactGrad" />);
    const heading = screen.getByRole('heading', { name: /hello reactgrad/i });
    expect(heading).toBeInTheDocument();
  });
});