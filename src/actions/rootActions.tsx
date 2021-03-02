import { Photo } from "../components/photosMasonry";

export const ADD_PHOTOS = 'ADD_PHOTOS';
export const SET_LIKED = 'SET_LIKED';
export const DELETE_LIKED = 'DELETE_LIKED';
export const SET_MODAL = 'SET_MODAL';

export const addPhotos = (photos: any) => ({ // eslint-disable-line
  type: ADD_PHOTOS,
  payload: photos,
});

export const addLiked = (photo: Photo) => ({ // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
  type: SET_LIKED,
  payload: {...photo, liked: true},
});

export const deleteLiked = (photo: Photo) => ({ // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
  type: SET_LIKED,
  payload: {...photo, liked: false},
});

export const setModalOpen = (status: any) => ({ // eslint-disable-line
  type: SET_MODAL,
  payload: status,
});