import React, { useState } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css'
import './App.css';

const ACCESS_KEY = 'OSt_9Mgrjej5AEkCijPYhOB8nupoeTVQ9FH2MJjuvr8';

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
});

unsplash.defaults.headers.common['Authorization'] = `Client-ID ${ACCESS_KEY}`;

function App() {
  const [photos, setPhotos] = useState<any[]>([]);

  if (photos.length <= 1) {
    unsplash.get('/photos', {
      params: {
        per_page: 30,
      }
    })
    .then((response) => {
      console.log(response);
      const photos = response.data.map((photo: any) => {
        const { id, urls } = photo;
        const { regular: source } = urls;
  
        return {
          id,
          source,
        }
      });
      console.log('set photos');
      setPhotos(photos);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const breakpointColumns = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="App">
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-container"
        columnClassName="masonry-column"
      >
        {photos.map((photo) => {
          return (
            <div key={photo.id} className="photo-box">
              <img src={photo.source} />
            </div>
          )
        })}
      </Masonry>
    </div>
  );
}

export default App;
