/* eslint-disable */
function makeRequest(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      resolve(json);
    } catch (e) {
      reject(e);
    }
  });
}

export function fetchAlbums() {
  return makeRequest(`https://jsonplaceholder.typicode.com/albums`);
}

export function fetchPhotos(albumId) {
  return makeRequest(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
  );
}
