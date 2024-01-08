import { render, screen, fireEvent, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useForm } from 'react-hook-form';
import OptionSelect from '../../../components/option-select/option-select';
import { IFormInputs } from '../../../types/shared';

const TestForm: React.FC = () => {
    const { control } = useForm<IFormInputs>({
        defaultValues: {
            type: '',
            status: '',
            format: '',
            searchValue: '',
        },
    });

    return (
        <OptionSelect
            control={control}
            name='test'
            data={['Option 1', 'Option 2']}
            label={true}
            labelName='Test Label'
        />
    );
};

describe('OptionSelect Component', () => {
    it('renders correctly', () => {
        render(<TestForm />);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders options correctly', () => {
        render(<TestForm />);
        fireEvent.mouseDown(screen.getByRole('combobox'));
        const listbox = within(screen.getByRole('listbox'));
        expect(listbox.getByText('Option 1')).toBeInTheDocument();
        expect(listbox.getByText('Option 2')).toBeInTheDocument();
    });

    it('changes value when an option is selected', async () => {
        render(<TestForm />);
        fireEvent.mouseDown(screen.getByRole('combobox'));
        const listbox = within(screen.getByRole('listbox'));
        await act(async () => {
            fireEvent.click(listbox.getByText('Option 2'));
        });
        expect(screen.getByRole('combobox')).toHaveTextContent('Option 2');
    });

    it('renders label correctly', () => {
        render(<TestForm />);
        const label = screen.getAllByText('Test Label');
        expect(label[0]).toBeInTheDocument();
    });
});
