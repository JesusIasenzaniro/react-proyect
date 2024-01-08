import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';

jest.mock('../../../context/ui-control-context', () => ({
  useUIControlContext: jest.fn()
}));

jest.mock('../../../store', () => ({
  useStore: jest.fn()
}));

describe('<Navbar />', () => {
  beforeEach(() => {
      require('../../../context/ui-control-context').useUIControlContext.mockReturnValue({
          handleLogOut: jest.fn()
      });

      require('../../../store').useStore.mockReturnValue([null]);
  });

  it('should render correctly', () => {
      const { getAllByRole } = render(<Router><Navbar /></Router>);
      const buttons = getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
  });

  it('should open and close the drawer when clicking the button', () => {
      const { getAllByRole } = render(<Router><Navbar /></Router>);
      const buttons = getAllByRole('button');
      const drawerButton = buttons[0];

      fireEvent.click(drawerButton);
      fireEvent.click(drawerButton);
  });
});