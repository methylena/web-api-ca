export const getFavorites = async () => {
  const response = await fetch('http://localhost:8080/api/favorites', {
    headers: {
      Authorization: window.localStorage.getItem('token'),
    },
  });
  return response.json();
};

export const addFavorite = async (data) => {
  const response = await fetch('http://localhost:8080/api/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: window.localStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteFavorite = async (id, mediaType) => {
  const response = await fetch(
    `http://localhost:8080/api/favorites/${id}?mediaType=${mediaType}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: window.localStorage.getItem('token'),
      },
    }
  );
  return response;
};
