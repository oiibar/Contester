import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageHeader from './PageHeader';

describe('PageHeader', () => {
  test('renders children text', () => {
    render(<PageHeader>Contests</PageHeader>);
    expect(screen.getByText('Contests')).toBeInTheDocument();
  });
});
