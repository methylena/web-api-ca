import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./authContext";
import { getFavorites, addFavorite, deleteFavorite } from "../api/favorites-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const auth = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      getFavorites().then((data) => {
        if (Array.isArray(data)) {
          setFavorites(data);
        }
      });
    } else {
      setFavorites([]);
    }
  }, [auth.isAuthenticated, auth.userName]);

  const addToFavorites = (movie) => {
    const mediaType = movie.media_type || movie.mediaType || "movie";
    let newFavorites = [];
    if (!favorites.find((item) => item.id === movie.id && item.mediaType === mediaType)) {
      newFavorites = [...favorites, { id: movie.id, mediaType }];
      setFavorites(newFavorites);
      if (auth.isAuthenticated) {
        addFavorite({ id: movie.id, mediaType });
      }
    }
  };

  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = (movie) => {
    let newPlaylist = [];
    if (!playlist.includes(movie.id)) {
      newPlaylist = [...playlist, movie.id];
    } else {
      newPlaylist = [...playlist];
    }
    setPlaylist(newPlaylist);
    console.log("Playlist: ", newPlaylist);
  };

  const removeFromFavorites = (movie) => {
    const mediaType = movie.media_type || movie.mediaType || "movie";
    setFavorites(
      favorites.filter(
        (item) => !(item.id === movie.id && item.mediaType === mediaType)
      )
    );
    if (auth.isAuthenticated) {
      deleteFavorite(movie.id, mediaType);
    }
  };

  const [myReviews, setMyReviews] = useState({});

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        playlist,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToPlaylist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
