import React from 'react';
import Masonry from 'react-masonry-css';

import './scss/photos-masonry.scss';

// interface Photo {
//   id: string;
//   source: string;
//   alt: string;
// }
// export interface PhotosMasonryProps {
//   photos: Photo[];
// }

export interface PhotosMasonryProps {
  children: React.ReactNode;
}

const breakpointColumns = {
  default: 5,
  1100: 3,
  700: 2,
  500: 1
};

export const PhotosMasonry = ({ children }: PhotosMasonryProps) => (
  <Masonry
    breakpointCols={breakpointColumns}
    className="masonry-container"
    columnClassName="masonry-column"
  >
    {children}
  </Masonry>
);