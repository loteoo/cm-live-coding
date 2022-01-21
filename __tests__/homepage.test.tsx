import { render } from '@testing-library/react';
import HomePage from '../src/pages/home';

test('Page renders correctly', () => {
  const result = render(
    <HomePage />
  );
    
  expect(result.findByTestId('page-title')).toExist();
});
