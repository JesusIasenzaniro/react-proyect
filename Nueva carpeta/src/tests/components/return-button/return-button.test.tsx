import { render, screen, fireEvent } from '@testing-library/react';
import ReturnButton from '../../../components/return-button/return-button';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('ReturnButton Component', () => {
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders correctly', () => {
    render(<ReturnButton />);
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('displays the ArrowBackIcon', () => {
    render(<ReturnButton />);
    expect(screen.getByTestId('ArrowBackIcon')).toBeInTheDocument();
  });

  it('displays the word "Back"', () => {
    render(<ReturnButton />);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('calls navigate with -1 when clicked', () => {
    render(<ReturnButton />);
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
