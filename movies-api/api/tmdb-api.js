import fetch from 'node-fetch';

export const getMovies = () => {
    return fetch(
      `http://localhost:8080/api/movies/discover`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
        throw error
    });
  };
  
