import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
// import axios from 'axios';



test('renders learn react link', () => {
  // axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
