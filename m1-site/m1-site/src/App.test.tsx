// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app/page';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to the Library Management System/i);
  expect(welcomeElement).toBeInTheDocument();
});
