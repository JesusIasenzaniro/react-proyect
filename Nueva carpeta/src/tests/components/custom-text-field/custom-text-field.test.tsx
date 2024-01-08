import { render, screen } from '@testing-library/react';
import { CustomTextFieldStyles } from '../../../components/custom-text-field-styles/custom-text-field-styles';

describe('CustomTextField Component', () => {
  it('renders correctly', () => {
    render(<CustomTextFieldStyles label="Test Label" />);
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    
    const labelElements = screen.getAllByText('Test Label');
    labelElements.forEach((element) => {
        if (element.tagName.toLowerCase() === 'label') {
            expect(element).toBeInTheDocument();
        }
    });
  });
  
  it('applies styling correctly', () => {
    render(<CustomTextFieldStyles label="Test Label" />);
    
    const labelElements = screen.getAllByText('Test Label');
    labelElements.forEach((element) => {
        if (element.tagName.toLowerCase() === 'label') {
            expect(element).toBeInTheDocument();
            expect(element).toHaveClass('MuiFormLabel-root');
        }
    });
    });
})
