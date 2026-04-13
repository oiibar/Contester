import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyButton from './MyButton';

describe('MyButton', () => {
  test('renders children text', () => {
    render(<MyButton>Click Me</MyButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('applies extra className', () => {
    render(<MyButton className="extra-class">Hi</MyButton>);
    const btn = screen.getByText('Hi');
    expect(btn).toHaveClass('extra-class');
  });

  test('triggers onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<MyButton onClick={handleClick}>Press</MyButton>);
    fireEvent.click(screen.getByText('Press'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('supports passing extra props', () => {
    render(<MyButton type="submit">Submit</MyButton>);
    const btn = screen.getByText('Submit');
    expect(btn).toHaveAttribute('type', 'submit');
  });
});
