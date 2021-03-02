import React from 'react';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPhotos } from '../../reducers/rootReducer';
import { setModalOpen } from '../../actions/rootActions';
import Loader from '../../assets/images/loader.svg';
import SmallLikedIcon from '../../assets/images/small-heart.svg';

import './scss/photos-masonry.scss';

interface User {
  twitter: string;
  instagram: string;
  username: string;
  likes: number;
  allPhotos: number;
  collections: number;
}

export interface Photo {
  id: string;
  source: string;
  alt: string;
  fullSource: string;
  liked: boolean;
  description: string;
  name: string;
  profilePicture: string;
  user: User;
}

export interface PhotosMasonryProps {
  photos: Photo[];
  loadLiked?: boolean,
}

const breakpointColumns = {
  default: 8,
  2800: 7,
  2200: 6,
  1700: 5,
  1100: 4,
  900: 3,
  700: 3,
  500: 2
};

export const PhotosMasonry = ({ photos, loadLiked = false }: PhotosMasonryProps) => {
  const dispatch = useDispatch();

  return (
    <div className="photos-container">
      <InfiniteScroll
        dataLength={photos.length}
        next={() => dispatch(getPhotos())}
        hasMore={loadLiked ? false : photos.length < 90}
        loader={() => <Loader />}
      >
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
      </InfiniteScroll>
    </div>
  )
};