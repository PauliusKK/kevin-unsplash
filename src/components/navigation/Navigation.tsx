import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import PhotosIcon from '../../assets/images/photos.svg';
import LikedIcon from '../../assets/images/heart.svg';

import './scss/navigation.scss';

export const Navigation = () => (
  <div className="navigation">
    <Link to="/">
      <div className="logo">
        <img src={Logo} alt="kevin." />
      </div>
    </Link>
    <div className="menu">
      <Link to="/photos">
        <div className="button">
          <img src={PhotosIcon} alt="photos" />
        </div>
      </Link>
      <Link to="/liked">
        <div className="button">
          <img src={LikedIcon} alt="liked" />
        </div>
      </Link>
    </div>
  </div>
);