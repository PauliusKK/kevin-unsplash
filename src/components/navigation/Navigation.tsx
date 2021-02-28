import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import PhotosIcon from '../../assets/images/photos.svg';
import FavouritesIcon from '../../assets/images/favourites.svg';

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
      <Link to="/favourites">
        <div className="button">
          <img src={FavouritesIcon} alt="favourites" />
        </div>
      </Link>
    </div>
  </div>
);