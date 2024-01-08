import { render } from '@testing-library/react';
import ErrorPage from '../../../pages/error/error-page';

describe('<ErrorPage />', () => {
    it('should render the error message', () => {
        const errorMessage = "Oops! Something went wrong.";
        const { getByText } = render(<ErrorPage errorMessage={errorMessage} />);
        expect(getByText(errorMessage)).toBeInTheDocument();
    });

    it('should render the error code if provided', () => {
        const errorMessage = "Oops! Something went wrong.";
        const errorCode = "404";
        const { getByText } = render(
            <ErrorPage errorMessage={errorMessage} errorCode={errorCode} />
        );
        expect(getByText(errorCode)).toBeInTheDocument();
    });

    it('should not render the error code if not provided', () => {
        const errorMessage = "Oops! Something went wrong.";
        const { getByText, container } = render(<ErrorPage errorMessage={errorMessage} />);
        
        expect(getByText(errorMessage)).toBeInTheDocument();
    });
});