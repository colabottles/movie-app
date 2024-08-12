import { render, screen } from '@testing-library/react';
import App from './App';

test('renders react movie app', () => {
  render(<App />);
  const linkElement = screen.getByText(/react movie app/i);
  expect(linkElement).toBeInTheDocument();
});
