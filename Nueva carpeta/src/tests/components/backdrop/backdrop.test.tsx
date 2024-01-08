import { render, screen, fireEvent } from '@testing-library/react';
import SimpleBackdrop from '../../../components/backdrop/backdrop';

describe('SimpleBackdrop Component', () => {
  it('displays when openBackdrop is true', () => {
    const { container } = render(<SimpleBackdrop openBackdrop={true} handleCloseBackdrop={() => {}} />);
    
    const backdrop = container.querySelector('.MuiBackdrop-root');
    expect(backdrop).toBeInTheDocument();
  });

  it('calls handleCloseBackdrop when clicked', () => {
    const handleCloseBackdrop = jest.fn();
    const { container } = render(<SimpleBackdrop openBackdrop={true} handleCloseBackdrop={handleCloseBackdrop} />);
    
    const backdrop = container.querySelector('.MuiBackdrop-root');
    if (backdrop) {
      fireEvent.click(backdrop);
    }
    
    expect(handleCloseBackdrop).toHaveBeenCalled();
  });
});