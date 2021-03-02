import React from 'react';
import classnames from 'classnames'
import { useDispatch } from 'react-redux';
import { addLiked, deleteLiked, setModalOpen } from '../../../actions/rootActions';
import { PhotoProps } from '../Modal';

import CloseIcon from '../../../assets/images/close.svg';
import SmallLikedIcon from '../../../assets/images/small-heart.svg';

import '../scss/cta-box.scss';

export const CtaBox = ({ photo }: PhotoProps) => {
  const dispatch = useDispatch();

  return (
    <div className="cta-box">
      <button
        className={classnames('cta', photo.liked && 'liked')}
        onClick={() => {
          photo.liked ? dispatch(deleteLiked(photo)) : dispatch(addLiked(photo))
        }}
      >
        <img src={SmallLikedIcon} alt={'icon'} />
        <span>{photo.liked ? 'Unlike' : 'Like'}</span>
      </button>

      <button className="modal-close" onClick={() => dispatch(setModalOpen(false))}>
        <img src={CloseIcon} alt="Close" />
      </button>
    </div>
  )
};