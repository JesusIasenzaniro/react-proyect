import { render, screen } from '@testing-library/react';
import DashboardCard from '../../../components/dashboard-card/dashboard-card';

describe('DashboardCard Component', () => {
    it('renders correctly', () => {
        render(
            <DashboardCard
                img='testImage.jpg'
                name='Test Name'
                desc='Test Description'
                link='Test Link'
                bnpUserRol='Test User Role'
                azureToken='Test Azure Token'
                dqrUserRol='Test Dqr Role'
            />
        );

        expect(
            screen.getByRole('img', { name: 'dashboard-img' })
        ).toBeInTheDocument();

        expect(screen.getByText('Test Name')).toBeInTheDocument();

        expect(screen.getByText('Test Description')).toBeInTheDocument();

        expect(
            screen.getByRole('img', { name: 'circle-arrow-right' })
        ).toBeInTheDocument();
    });
});
