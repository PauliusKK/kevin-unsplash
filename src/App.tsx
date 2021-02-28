import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-modal';
import { Navigation } from './components/navigation';
import { PhotosMasonry } from './components/photosMasonry';
import Loader from './assets/images/loader.svg';
import CloseIcon from './assets/images/close.svg';
import DefaultAuthorIcon from './assets/images/default-author.svg';
import './App.scss';

const ACCESS_KEY = 'OSt_9Mgrjej5AEkCijPYhOB8nupoeTVQ9FH2MJjuvr8';

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
});

unsplash.defaults.headers.common['Authorization'] = `Client-ID ${ACCESS_KEY}`;

function App() {
  const [unsplashPage, setUnsplashPage] = useState(1);
  const [photos, setPhotos] = useState<any[]>([]);
  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = () => {
    unsplash.get('/photos', {
      params: {
        page: unsplashPage,
        per_page: 30,
      }
    })
    .then((response) => {
      // console.log(response);
      const newPhotos = response.data.map((photo: any) => {
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
            twitter: `@${twitter}` || 'Unknown',
            instagram: `@${instagram}` || 'Unknown',
            username: username || 'Unknown',
            likes: likes || 0,
            allPhotos: allPhotos || 0,
            collections: collections || 0,
          }
        }
      });
      // console.log('set photos');
      const allPhotos = [...photos, ...newPhotos];
      setPhotos(allPhotos);
      setUnsplashPage(unsplashPage + 1);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Redirect to="/photos" />
        </Route>
        <Route path="/favourites" render={(() => (
          <>
            <Navigation />
          </>
        ))} />
        <Route path="/photos" render={() => (
          <>
            <Navigation />
            <InfiniteScroll
              dataLength={photos.length}
              next={fetchPhotos}
              hasMore={true}
              loader={<img src={Loader} alt="Loading..." />}
            >
              <PhotosMasonry>
                {photos.map((photo: any) => (
                  <div key={photo.id} className="photo-box">
                    <Link to={`/photos/${photo.id}`} onClick={() => setOpen(true)}>
                      <img src={photo.regularSource} alt={photo.alt} />
                    </Link>
                  </div>
                ))}
              </PhotosMasonry>
            </InfiniteScroll>
          </>
        )} />
        <Route path="/photos/:photoId" render={({ match }: any) => {
          const photo = photos.find(photo => photo.id === match.params.photoId);

          return (
            <Modal
              isOpen={isOpen}
              onRequestClose={() => setOpen(false)}
              style={{ overlay: { display: 'flex', zIndex: 999, backgroundColor: 'rgba(43, 43, 43, 0.7)' } }}
              ariaHideApp={false}
              className="modal"
            >
              <div className="image-box">
                {photo && photo.fullSource && photo.alt && (
                  <img src={photo.fullSource} alt={photo.alt} />
                )}
              </div>
              <div className="description-box">
                <div className="cta-box">
                  <button className="like">
                    Like
                  </button>
                  <button className="modal-close" onClick={() => setOpen(false)}>
                    <img src={CloseIcon} alt="Close" />
                  </button>
                </div>
                {photo && photo.description && <h2 className="description">{photo.description}</h2>}
                {photo && photo.name && (
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
                    {photo && photo.user && Object.entries(photo.user).map(([key, value]: any) => (
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
