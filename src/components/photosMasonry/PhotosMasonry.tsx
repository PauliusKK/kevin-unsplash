import React from 'react';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setModalOpen } from '../../actions/rootActions';
import { Photo } from '../modal'
import SmallLikedIcon from '../../assets/images/small-heart.svg';

import './scss/photos-masonry.scss';

export interface PhotosMasonryProps {
  photos: Photo[];
  loadLiked?: boolean,
}

const breakpointColumns = {
  default: 5,
  1100: 3,
  700: 2,
  500: 1
};

export const PhotosMasonry = ({ photos, loadLiked = false }: PhotosMasonryProps) => {
  const dispatch = useDispatch();

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-container"
      columnClassName="masonry-column"
    >
      {photos.map((photo: any) => (
        <div key={photo.id} className="photo-box">

          {photo && photo.liked && (
            <div className="liked-box">
              <img src={SmallLikedIcon} alt={'Liked'} className="liked" />
            </div>
          )}

          <Link
            to={loadLiked ? `/liked/${photo.id}` : `/photos/${photo.id}`}
            onClick={() => dispatch(setModalOpen(true))}
          >
            <img src={photo.regularSource} alt={photo.alt} />
          </Link>
        </div>
      ))}
    </Masonry>
  )
};