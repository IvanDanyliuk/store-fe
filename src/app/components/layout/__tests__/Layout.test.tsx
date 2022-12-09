import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/testUtils';
import Layout from '../Layout';


describe('Tests for the Layout component', () => {
  test('should render the Layout component with passed children', () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByText(/Content/)).toBeInTheDocument();
  });
});