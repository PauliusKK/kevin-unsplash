import React, { useState } from 'react';
import axios from 'axios';
import { Navigation } from './components/navigation';
import { PhotosMasonry } from './components/photosMasonry';
import './App.scss';

const ACCESS_KEY = 'OSt_9Mgrjej5AEkCijPYhOB8nupoeTVQ9FH2MJjuvr8';

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
});

unsplash.defaults.headers.common['Authorization'] = `Client-ID ${ACCESS_KEY}`;

function App() {
  const [photos, setPhotos] = useState([]);

  if (photos.length <= 1) {
    unsplash.get('/photos', {
      params: {
        per_page: 30,
      }
    })
    .then((response) => {
      console.log(response);
      const photos = response.data.map((photo: any) => {
        const { id, urls, alt_description: alt } = photo;
        const { regular: source } = urls;
  
        return {
          id,
          source,
          alt,
        }
      });
      console.log('set photos');
      setPhotos(photos);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <div className="App">
      <Navigation />
      <PhotosMasonry photos={photos} />
    </div>
  );
}

export default App;
