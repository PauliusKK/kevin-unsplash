export const ADD_PHOTOS = 'ADD_PHOTOS';
export const SET_LIKED = 'SET_LIKED';
export const DELETE_LIKED = 'DELETE_LIKED';
export const SET_MODAL = 'SET_MODAL';

export const addPhotos = (photos: any) => ({
  type: ADD_PHOTOS,
  payload: photos,
});

export const addLiked = (photo: any) => ({
  type: SET_LIKED,
  payload: {...photo, liked: true},
});

export const deleteLiked = (photo: any) => ({
  type: SET_LIKED,
  payload: {...photo, liked: false},
});

export const setModal = (status: any) => ({
  type: SET_MODAL,
  payload: status,
});