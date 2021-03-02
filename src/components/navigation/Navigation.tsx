import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Logo from '../../assets/images/logo.svg';
import PhotosIcon from '../../assets/images/photos.svg';
import LikedIcon from '../../assets/images/heart.svg';

import './scss/navigation.scss';

export const Navigation = () => (
  <div className="navigation">
    <Link to="/" className="navigation__logo">
      <img src={Logo} alt="kevin." />
    </Link>
    <div className="navigation__menu">
      <Link
        to="/photos"
        className={classnames('navigation__button',
          location.pathname.includes('photos') && 'navigation__button--active'
        )}
      >
        <img src={PhotosIcon} alt="photos" />
      </Link>
      <Link
        to="/liked"
        className={classnames('navigation__button',
          location.pathname.includes('liked') && 'navigation__button--active'
        )}
      >
        <img src={LikedIcon} alt="liked" />
      </Link>
    </div>
  </div>
);