import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Navigation } from './components/navigation';
import { PhotosMasonry } from './components/photosMasonry';
import { Modal } from './components/modal';
import { useSelector, useDispatch } from 'react-redux';
import { getPhotos } from './reducers/rootReducer';
import { setModalOpen } from './actions/rootActions';

function App() {
  const photos = useSelector((state: any) => state.photos);
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
              <PhotosMasonry photos={photos.filter((photo: any) => photo.liked)} loadLiked />
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
          path={["/photos/:photoId", "/liked/:photoId"]} render={({ match }: any) => {
            const photo = photos.find((photo: any) => photo.id === match.params.photoId);

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
