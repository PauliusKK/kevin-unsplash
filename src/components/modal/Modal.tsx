import React from 'react';
import ReactModal from 'react-modal';
import classnames from 'classnames'
import { useSelector, useDispatch } from 'react-redux';
import { addLiked, deleteLiked, setModalOpen } from '../../actions/rootActions';

import CloseIcon from '../../assets/images/close.svg';
import DefaultAuthorIcon from '../../assets/images/default-author.svg';
import SmallLikedIcon from '../../assets/images/small-heart.svg';

import './scss/modal.scss';

export interface Photo {
  id: string;
  source: string;
  alt: string;
  fullSource: string;
  liked: boolean;
  description: string;
  name: string;
  profilePicture: string;
  user: {};
}

export interface PhotoProps {
  photo: Photo;
}

export const Modal = ({ photo }: PhotoProps) => {
  const isModalOpen = useSelector((state: any) => state.isModalOpen)
  const dispatch = useDispatch();

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => dispatch(setModalOpen(false))}
      style={{ overlay: { display: 'flex', zIndex: 999, backgroundColor: 'rgba(43, 43, 43, 0.7)' } }}
      ariaHideApp={false}
      className="modal"
    >
      <div className="image-box">
        {photo.fullSource && photo.alt && (
          <img src={photo.fullSource} alt={photo.alt} />
        )}
      </div>

      <div className="description-box">
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

        {photo.description && <h2 className="description">{photo.description}</h2>}

        {photo.name && (
          <div className="author-info">
            <img
              src={photo.profilePicture ? photo.profilePicture : DefaultAuthorIcon}
              alt={photo.name}
              className="author-photo"
            />
            <span className="author-name">{photo.name}</span>
          </div>
        )}

        <div className="specifications">
          {photo.user && Object.entries(photo.user).map(([key, value]: any) => (
            <div className="specification">
              <p>{key}</p>
              <h5>{value}</h5>
            </div>
          ))}
        </div>
      </div>
    </ReactModal>
  )
};