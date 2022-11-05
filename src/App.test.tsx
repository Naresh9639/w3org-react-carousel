import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Recent news carousel', () => {
  render(<App />);
  const linkElement = screen.getByText(/Recent news/i);
  expect(linkElement).toBeInTheDocument();
});
