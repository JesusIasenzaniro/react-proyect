import { render, screen, fireEvent } from '@testing-library/react';
import Toast from '../../../components/toast/toast';

describe('Toast Component', () => {
    it('renders correctly when open', () => {
        render(
            <Toast
                openToast={true}
                handleCloseToast={() => {}}
                message='Test Message'
                severity='success'
            />
        );

        expect(screen.getByText('Test Message')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveClass(
            'MuiAlert-standardSuccess'
        );
    });

    it('does not render when closed', () => {
        const { queryByText } = render(
            <Toast
                openToast={false}
                handleCloseToast={() => {}}
                message='Test Message'
                severity='success'
            />
        );

        expect(queryByText('Test Message')).toBeNull();
    });

    it('calls handleCloseToast when closed', () => {
        const handleCloseToast = jest.fn();
        render(
            <Toast
                openToast={true}
                handleCloseToast={handleCloseToast}
                message='Test Message'
                severity='success'
            />
        );

        fireEvent.click(screen.getByRole('button'));
        expect(handleCloseToast).toHaveBeenCalled();
    });
});
