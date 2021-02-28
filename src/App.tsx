import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-modal';
import { Navigation } from './components/navigation';
import { PhotosMasonry } from './components/photosMasonry';
import './App.scss';

const ACCESS_KEY = 'OSt_9Mgrjej5AEkCijPYhOB8nupoeTVQ9FH2MJjuvr8';

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
});

unsplash.defaults.headers.common['Authorization'] = `Client-ID ${ACCESS_KEY}`;

function App() {
  const [unsplashPage, setUnsplashPage] = useState(1);
  const [photos, setPhotos] = useState<any[]>([]);
  const [isOpen, setOpen] = useState(false);

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
      console.log(response);
      const newPhotos = response.data.map((photo: any) => {
        const { id, urls, alt_description: alt } = photo;
        const { regular: source } = urls;
  
        return {
          id,
          source,
          alt,
        }
      });
      console.log('set photos');
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
        <Route path="/photos" render={() => (
          <>
            <Navigation />
            <InfiniteScroll
              dataLength={photos.length}
              next={fetchPhotos}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
              <PhotosMasonry>
                {photos.map((photo: any) => (
                  <div key={photo.id} className="photo-box">
                    <Link to={`/photos/${photo.id}`} onClick={() => setOpen(true)}>
                      <img src={photo.source} alt={photo.alt} />
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
              style={{ content: { maxWidth: 988, margin: 'auto', borderRadius: 10, maxHeight: 650 }, overlay: { zIndex: 999, backgroundColor: 'rgba(43, 43, 43, 0.7)' } }}
              ariaHideApp={false}
            >
              <button className="modal-close" onClick={() => setOpen(false)}>
                X
              </button>
              {photo && photo.id && <h2>a photo with {photo.id}</h2>}
            </Modal>
          )
        }} />
      </Router>
    </div>
  );
}

export default App;
