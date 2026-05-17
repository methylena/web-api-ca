import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )

  const addToFavorites = (movie) => {
    const mediaType = movie.media_type || movie.mediaType || "movie";
    let newFavorites = [];
    if (!favorites.find((item) => item.id === movie.id && item.mediaType === mediaType)){
      newFavorites = [...favorites, { id: movie.id, mediaType }];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
  
  const [playlist, setPlaylist] = useState( [] )

  const addToPlaylist = (movie) => {
    let newPlaylist = [];
    if (!playlist.includes(movie.id)){
      newPlaylist = [...playlist, movie.id];
    }
    else{
        newPlaylist = [...playlist];
    }
    setPlaylist(newPlaylist)
    console.log("Playlist: ", newPlaylist);
  };
  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    const mediaType = movie.media_type || movie.mediaType || "movie";
    setFavorites( favorites.filter(
      (item) => !(item.id === movie.id && item.mediaType === mediaType)
    ) )
  };
  const [myReviews, setMyReviews] = useState( {} ) 

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

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
