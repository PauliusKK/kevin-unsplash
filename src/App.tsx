import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-modal';
import classnames from 'classnames';
import { Navigation } from './components/navigation';
import { PhotosMasonry } from './components/photosMasonry';
import { useSelector, useDispatch } from 'react-redux';
import { getPhotos } from './reducers/rootReducer';
import { addLiked, deleteLiked } from './actions/rootActions';
import Loader from './assets/images/loader.svg';
import CloseIcon from './assets/images/close.svg';
import DefaultAuthorIcon from './assets/images/default-author.svg';
import SmallLikedIcon from './assets/images/small-heart.svg';
import './App.scss';

function App() {
  const photos = useSelector((state: any) => state.photos);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Redirect to="/photos" />
        </Route>
        <Route path="/liked" render={(() => (
          <>
            <Navigation />
            <PhotosMasonry>
              {photos.filter((photo: any) => photo.liked).map((photo: any) => (
                <div key={photo.id} className="photo-box">
                  {photo && photo.liked && (
                    <div className="liked-box">
                      <img src={SmallLikedIcon} alt={'Liked'} className="liked" />
                    </div>
                  )}
                  <Link to={`/liked/${photo.id}`} onClick={() => setOpen(true)}>
                    <img src={photo.regularSource} alt={photo.alt} />
                  </Link>
                </div>
              ))}
            </PhotosMasonry>
          </>
        ))} />
        <Route path="/photos" render={() => (
          <>
            <Navigation />
            <InfiniteScroll
              dataLength={photos.length}
              next={console.log("Its broken duude") as any}
              // next={getPhotos() as any} // it is fucking broke
              hasMore={true}
              loader={<img src={Loader} alt="Loading..." />}
            >
              <PhotosMasonry>
                {photos.map((photo: any) => (
                  <div key={photo.id} className="photo-box">
                    {photo && photo.liked && (
                      <div className="liked-box">
                        <img src={SmallLikedIcon} alt={'Liked'} className="liked" />
                      </div>
                    )}
                    <Link to={`/photos/${photo.id}`} onClick={() => setOpen(true)}>
                      <img src={photo.regularSource} alt={photo.alt} />
                    </Link>
                  </div>
                ))}
              </PhotosMasonry>
            </InfiniteScroll>
          </>
        )} />
        <Route path={["/photos/:photoId", "/liked/:photoId"]} render={({ match }: any) => {
          const photo = photos.find((photo: any) => photo.id === match.params.photoId);

          console.log('match', match);

          if (!photo || (match.path === '/liked/:photoId' && !photo.liked)) { // modal disappear on unlike in /liked/id
            return false;
          }

          return (
            <Modal
              isOpen={isOpen}
              onRequestClose={() => setOpen(false)}
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
                    className={classnames('cta',
                      photo.liked && 'liked'
                    )}
                    onClick={() => {
                      photo.liked ? dispatch(deleteLiked(photo)) : dispatch(addLiked(photo))
                    }}
                  >
                    <img src={SmallLikedIcon} alt={'icon'} />
                    <span>{photo.liked ? 'Unlike' : 'Like'}</span>
                  </button>
                  <button className="modal-close" onClick={() => setOpen(false)}>
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
                  <div className="info-box">
                    {photo.user && Object.entries(photo.user).map(([key, value]: any) => (
                      <div className="specification">
                        <p>{key}</p>
                        <h5>{value}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Modal>
          )
        }} />
      </Router>
    </div>
  );
}

export default App;
