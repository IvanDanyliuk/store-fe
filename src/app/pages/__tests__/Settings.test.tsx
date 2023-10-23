import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/testUtils';
import { Settings } from '../';


describe('Tests for the Settings page', () => {
  test('should render the Settings page', async () => {
    renderWithProviders(<Settings />);
    expect(screen.getAllByRole('link')).toHaveLength(5);
  });
});