import { render, screen } from '@testing-library/react';
import ChipStatus from '../../../components/chip-status/chip-status';

describe('ChipStatus Component', () => {
    it('renders correctly with label and color', () => {
      const { container } = render(<ChipStatus label="Test Label" color="primary" />);
      
      const chipElement = container.querySelector('.MuiChip-root');
      expect(chipElement?.textContent).toBe('Test Label');
      
      expect(chipElement).toHaveClass('MuiChip-colorPrimary');
    });
  
    it('handles undefined label and color correctly', () => {
      const { container } = render(<ChipStatus label={undefined} color={undefined} />);
      
      const chipElement = container.querySelector('.MuiChip-root');
      expect(chipElement?.textContent).toBe('');
      
      expect(chipElement).toHaveClass('MuiChip-colorDefault');
    });
  });