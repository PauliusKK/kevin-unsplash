import React from 'react';
import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { setModalOpen } from '../../actions/rootActions';
import { Photo } from '../photosMasonry'
import DefaultAuthorIcon from '../../assets/images/default-author.svg';

import './scss/modal.scss';
import { CtaBox } from './components/CtaBox';

export interface PhotoProps {
  photo: Photo;
}

export const Modal = ({ photo }: PhotoProps) => {
  const isModalOpen = useSelector((state: any) => state.isModalOpen);
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
        <CtaBox photo={photo} />
        {photo.fullSource && photo.alt && (
          <img src={photo.fullSource} alt={photo.alt} />
        )}
      </div>

      <div className="description-box">
        <div className="container">
          <CtaBox photo={photo} />
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
              <div className="specification" key={key}>
                <p>{key}</p>
                <h5>{value}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ReactModal>
  )
};