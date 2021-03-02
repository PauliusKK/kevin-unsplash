import React from 'react';
import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { setModalOpen } from '../../actions/rootActions';
import { Photo } from '../photosMasonry'
import DefaultAuthorIcon from '../../assets/images/default-author.svg';

import './scss/modal.scss';
import { CtaBox } from './components/CtaBox';
import { RootState } from '../../App';

export interface PhotoProps {
  photo: Photo;
}

export const Modal = ({ photo }: PhotoProps) => { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
  const isModalOpen = useSelector((state: RootState) => state.isModalOpen);
  const dispatch = useDispatch();

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => dispatch(setModalOpen(false))}
      style={{ overlay: { display: 'flex', zIndex: 999, backgroundColor: 'rgba(43, 43, 43, 0.7)' } }}
      ariaHideApp={false}
      className="modal"
    >
      <div className="modal__image-box">
        <CtaBox photo={photo} />
        {photo.fullSource && photo.alt && (
          <img src={photo.fullSource} alt={photo.alt} />
        )}
      </div>

      <div className="modal__description-box">
        <div className="modal__description-box--description-container">
          <CtaBox photo={photo} />
          {photo.description && <h2 className="modal__description-box--description">{photo.description}</h2>}
          {photo.name && (
            <div className="modal__author">
              <img
                src={photo.profilePicture ? photo.profilePicture : DefaultAuthorIcon}
                alt={photo.name}
                className="modal__author--photo"
              />
              <span className="modal__author--name">{photo.name}</span>
            </div>
          )}
          <div className="modal__specifications">
            {photo.user && Object.entries(photo.user).map(([key, value]): any => ( // eslint-disable-line @typescript-eslint/no-explicit-any
              <div className="modal__specifications--specification" key={key}>
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