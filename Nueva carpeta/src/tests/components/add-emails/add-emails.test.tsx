import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import AddEmails from '../../../components/add-emails/add-emails';
import { IFormInputs } from '../../../types/shared';

describe('AddEmails Component', () => {
    const TestComponent: React.FC = () => {
        const { control } = useForm<IFormInputs>({
            defaultValues: {
                addEmail: '',
            },
        });
        return <AddEmails control={control} />;
    };
    it('renders CustomTextField', () => {
        render(<TestComponent />);
    });

    it('Displays the different messages', () => {
        render(<TestComponent />);
        screen.debug();

        const input = screen.getByPlaceholderText(
            'Add emails separated by ";" and ending in "@allfunds"'
        );
        expect(input).toBeInTheDocument();

        expect(input).toHaveAttribute('name', 'addEmail');
        expect(input).toHaveAttribute('type', 'search');

        const label = screen.getByLabelText('Add emails');
        expect(label).toBeInTheDocument();
    });
});
