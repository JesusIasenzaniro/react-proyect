import { render, screen } from '@testing-library/react';
import SearchBar from '../../../components/search-bar/search-bar';
import { useForm } from 'react-hook-form';
import React from 'react';
import { IFormInputs } from '../../../types/shared';

describe('SearchBar Component', () => {
    let mockSetSearchValue: jest.Mock;
    let mockHandleSearch: jest.Mock;
    const TestComponent: React.FC = () => {
        const { control } = useForm<IFormInputs>({
            defaultValues: {
                addEmail: '',
            },
        });
        return (
            <SearchBar
                label={'Search by id, name or contact'}
                icon={false}
                control={control}
            />
        );
    };

    beforeEach(() => {
        mockSetSearchValue = jest.fn();
        mockHandleSearch = jest.fn();
    });

    it('renders correctly', () => {
        render(<TestComponent />);
    });

    it('Display the Label', () => {
        render(<TestComponent />);

        const input = screen.getByLabelText('Search by id, name or contact');

        expect(input).toBeInTheDocument();

        expect(input).toHaveAttribute('name', 'searchValue');
        expect(input).toHaveAttribute('type', 'text');
    });
});
