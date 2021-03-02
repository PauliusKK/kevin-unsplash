import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Logo from '../../assets/images/logo.svg';
import PhotosIcon from '../../assets/images/photos.svg';
import LikedIcon from '../../assets/images/heart.svg';

import './scss/navigation.scss';

export const Navigation = () => (
  <div className="navigation">
    <Link to="/" className="logo">
      <img src={Logo} alt="kevin." />
    </Link>
    <div className="menu">
      <Link
        to="/photos"
        className={classnames('button', location.pathname.includes('photos') && 'active')}
      >
        <img src={PhotosIcon} alt="photos" />
      </Link>
      <Link
        to="/liked"
        className={classnames('button', location.pathname.includes('liked') && 'active')}
      >
        <img src={LikedIcon} alt="liked" />
      </Link>
    </div>
  </div>
);