import React from 'react';
import { render, screen } from '@testing-library/react';
import ServicePage from './pages/ServicePage';

//test('renders learn react link', () => {
  //render(<ServicePage />);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
//});
test('renders ServicesPage', () => {
  render(<ServicePage />);
  expect(screen.getByText(/Nos services principaux/i)).toBeInTheDocument(); // Adjust text to match ServicesPage content
});
