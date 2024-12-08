const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;

function getImages(searchQuery, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(
        `Unfortunately, nothing was found for the request ${searchQuery}`
      )
    );
  });
}
const api = { getImages };
export default api;
