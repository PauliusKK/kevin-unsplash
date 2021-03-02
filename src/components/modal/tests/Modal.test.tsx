import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { Modal } from '../Modal';

const mockStore = configureMockStore([thunk]);

const samplePhoto = {
  alt: "person in brown long sleeve shirt using silver Surface",
  description: "person in brown long sleeve shirt using silver Surface",
  fullSource: "https://images.unsplash.com/photo-1612832021455-245704c6755a?crop=entropy&cs=srgb&fm=jpg&ixid=MXwyMTA4Mzd8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=85",
  id: "TQmnNr9odYs",
  liked: true,
  name: "Surface",
  profilePicture: "https://images.unsplash.com/profile-1587651800415-20eed2ec0209image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
  regularSource: "https://images.unsplash.com/photo-1612832021455-245704c6755a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMTA4Mzd8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=1080",
  user: {
    allPhotos: 84,
    collections: 0,
    instagram: "@surface",
    likes: 0,
    twitter: "@surface",
    username: "surface"
  }
};

describe('Modal test suite', () => {
  describe('ComponentModal', () => {
    test('renders correctly', () => {
      const store = mockStore({
        photo: samplePhoto,
      });
      const { asFragment } = render(
        <Provider store={store}>
          <Router>
            <Modal photo={store.photo || samplePhoto} />
          </Router>
        </Provider>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
})