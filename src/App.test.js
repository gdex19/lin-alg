import { render, screen } from '@testing-library/react';
import App from './App';

test('renders input', () => {
  render(<App />);
  const linkElement = screen.getByText(/Set Matrix Size/i);
  expect(linkElement).toBeInTheDocument();
});