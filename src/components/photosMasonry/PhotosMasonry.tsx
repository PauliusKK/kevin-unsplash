import React from 'react';
import Masonry from 'react-masonry-css';

import './scss/photos-masonry.scss';

interface Photo {
  id: string;
  source: string;
  alt: string;
}
export interface PhotosMasonryProps {
  photos: Photo[];
}

const breakpointColumns = {
  default: 5,
  1100: 3,
  700: 2,
  500: 1
};

export const PhotosMasonry = ({ photos }: PhotosMasonryProps) => (
  <Masonry
    breakpointCols={breakpointColumns}
    className="masonry-container"
    columnClassName="masonry-column"
  >
    {photos.map((photo: any) => {
        return (
        <div key={photo.id} className="photo-box">
            <img src={photo.source} alt={photo.alt} />
        </div>
        )
    })}
  </Masonry>
);