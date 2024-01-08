import { render, screen } from '@testing-library/react';
import Loading from '../../../pages/loading/loading';

describe('Loading Page', () => {
  it('renders correctly', () => {
    render(<Loading/>);
    screen.debug();
    expect(screen.getByRole('progressbar'));
  });
});