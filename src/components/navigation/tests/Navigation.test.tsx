import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Navigation } from '../Navigation';

describe('ComponentNavigaton', () => {
  test('renders correctly', () => {
    const { asFragment } = render(
      <Router>
        <Navigation />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});