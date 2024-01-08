import { render, screen } from '@testing-library/react';
import Dashboard from '../../../pages/dashboard/dashboard';
import { data } from '../../../data/dashboard/data-for-card';

describe('Dashboard Page', () => {

  beforeEach(() => {
    render(<Dashboard />);
  });

  it('renders all dashboard cards', () => {
    data.forEach(({ name }) => {
      const cardNames = screen.getAllByText(new RegExp(name, 'i'));
      expect(cardNames.length).toBeGreaterThan(0);
      cardNames.forEach((cardName) => {
        expect(cardName).toBeInTheDocument();
      });
    });
  });
});