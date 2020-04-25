import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Budgetr Index', () => {
  const { getByText } = render(<App />);
  const subtitleElement = getByText(/Money Management Web Application/i);
  expect(subtitleElement).toBeInTheDocument();
});