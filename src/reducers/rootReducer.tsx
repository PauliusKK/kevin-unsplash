import axios from 'axios';
import { findIndex, uniqBy } from 'lodash';
import { ADD_PHOTOS, SET_LIKED, SET_MODAL, addPhotos } from '../actions/rootActions';

const ACCESS_KEY = 'ddil7YUnQlHCNdp-MCUY0fOyfn232dWxHQJcQvAWIUU';

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
});

let unsplashPage = 1;

unsplash.defaults.headers.common['Authorization'] = `Client-ID ${ACCESS_KEY}`;

interface InitialAppState {
  photos: any[];
  isModalOpen: boolean;
}

export const initialState: InitialAppState = {
  photos: [],
  isModalOpen: true,
};

export const rootReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case ADD_PHOTOS: {
      return { ...state, photos: [...state.photos, ...action.payload] }
    }
    case SET_LIKED: {
      const likedPhotoIndex = findIndex(state.photos, (photo: any) => {
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

export const getPhotos = () => (dispatch: any) => {
  unsplash.get('/photos', {
    params: {
      page: unsplashPage,
      per_page: 30,
    }
  })
  .then((response) => {
    const photos = response.data.map((photo: any) => {
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

    const uniqPhotos = uniqBy(photos, 'id');
    dispatch(addPhotos(uniqPhotos));
    unsplashPage++;
  })
  .catch(function (error) {
    console.log(error);
  })
}