import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { Navigation } from './components/navigation';
import { Photo, PhotosMasonry } from './components/photosMasonry';
import { Modal } from './components/modal';
import { useSelector, useDispatch } from 'react-redux';
import { getPhotos } from './reducers/rootReducer';
import { setModalOpen } from './actions/rootActions';

export interface RootState {
  photos: Photo[];
  isModalOpen: boolean;
}

interface MatchParams {
  name: string;
  photoId: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> { // eslint-disable-line
}

export const App = () => { // eslint-disable-line
  const photos = useSelector((state: RootState) => state.photos);
  const dispatch = useDispatch();

  useEffect(() => {
    photos.length <= 1 && dispatch(getPhotos());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Redirect to="/photos" />
        </Route>
        <Route
          path="/liked" render={(() => (
            <>
              <Navigation />
              <PhotosMasonry photos={photos.filter((photo: Photo) => photo.liked)} loadLiked />
            </>
          ))}
        />
        <Route
          path="/photos" render={() => (
            <>
              <Navigation />
              <PhotosMasonry photos={photos} />
            </>
          )}
        />
        <Route
          path={["/photos/:photoId", "/liked/:photoId"]} render={({ match }: MatchProps) => {
            const photo = photos.find((photo: Photo) => photo.id === match.params.photoId);

            if (!photo || (match.path === '/liked/:photoId' && !photo.liked)) { // modal disappear on unlike in /liked/id
              return false;
            }

            dispatch(setModalOpen(true));
            return <Modal photo={photo} />
          }}
        />
      </Router>
    </div>
  );
}

export default App;
