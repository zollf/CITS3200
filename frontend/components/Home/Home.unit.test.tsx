import Home from './';
import React from 'react';
import { render } from '@testing-library/react';

it('matches its snapshot', () => {
  expect(render(<Home />).asFragment()).toMatchSnapshot();
});
