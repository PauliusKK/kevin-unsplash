import axios from 'axios';
import { findIndex, uniqBy } from 'lodash';
import { ADD_PHOTOS, SET_LIKED, SET_MODAL, addPhotos } from '../actions/rootActions';
import { Photo } from '../components/photosMasonry';
import { Dispatch } from 'redux';

const ACCESS_KEY = '';

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
});

let unsplashPage = 1;

unsplash.defaults.headers.common['Authorization'] = `Client-ID ${ACCESS_KEY}`;

interface InitialAppState {
  photos: Photo[];
  isModalOpen: boolean;
}

export const initialState: InitialAppState = {
  photos: [],
  isModalOpen: true,
};

interface GetPhoto {
  alt_description: string;
  description: string;
  id: string;
  user: {
    profile_image: string;
    name: string;
    twitter_username: string;
    instagram_username: string;
    username: string;
    total_likes: number;
    total_photos: number;
    total_collections: number;
  }
  urls: {
    regular: string;
    full: string;
  }
}

export const rootReducer = (state = initialState, action: any) => { // eslint-disable-line
  switch(action.type) {
    case ADD_PHOTOS: {
      return { ...state, photos: uniqBy([...state.photos, ...action.payload], 'id') }
    }
    case SET_LIKED: {
      const likedPhotoIndex = findIndex(state.photos, (photo: Photo) => {
        return photo.id === action.payload.id
      });

      state.photos[likedPhotoIndex].liked = action.payload.liked;

      return { ...state, photos: [...state.photos] };
    }
    case SET_MODAL: {
      return { ...state, isModalOpen: action.payload }
    }
    default:
      return state
  }
}

export const getPhotos = () => (dispatch: Dispatch) => { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
  unsplash.get('/photos', {
    params: {
      page: unsplashPage,
      per_page: 30,
    }
  })
  .then((response) => {
    const newPhotos = response.data.map((photo: GetPhoto) => {
      const { id, urls, alt_description: alt, description, user } = photo;
      const { regular: regularSource, full: fullSource } = urls;
      const {
        profile_image,
        name,
        twitter_username: twitter,
        instagram_username: instagram,
        username,
        total_likes: likes,
        total_photos: allPhotos,
        total_collections: collections,
      } = user;

      return {
        id,
        regularSource,
        fullSource,
        alt: alt || 'No Description',
        description: description ? description : alt ? alt : 'No Description',
        profilePicture: profile_image.small,
        name: name || 'Unknown',
        user: {
          twitter: twitter != null ? `@${twitter}` : 'Unknown',
          instagram: instagram != null ? `@${instagram}` : 'Unknown',
          username: username || 'Unknown',
          likes: likes || 0,
          allPhotos: allPhotos || 0,
          collections: collections || 0,
        }
      }
    });
    // console.log('state.photos', state);
    // const storedPhotos = state.photos;
    // const combinedPhotos = [...storedPhotos, ...newPhotos];
    // const uniqPhotos = uniqBy(combinedPhotos, 'id');
    dispatch(addPhotos(newPhotos));
    unsplashPage++;
  })
  .catch(function (error) {
    console.log(error);
  })
}