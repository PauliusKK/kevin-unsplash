import React from 'react';
import Logo from '../../assets/images/logo.svg';
import PhotosIcon from '../../assets/images/photos2.svg';
import FavouritesIcon from '../../assets/images/favourites2.svg';

import './scss/navigation.scss';

export const Navigation = () => (
  <div className="navigation">
    <div className="logo">
      <img src={Logo} alt="kevin." />
    </div>
    <div className="menu">
      <div className="button">
        <img src={PhotosIcon} />
      </div>
      <div className="button">
        <img src={FavouritesIcon} />
      </div>
    </div>
  </div>
);