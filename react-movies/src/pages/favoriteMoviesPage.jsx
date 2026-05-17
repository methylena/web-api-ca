import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie, getTVShow } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const {favorites } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries({
    queries: favorites.map((favoriteItem) => {
      return {
        queryKey: [favoriteItem.mediaType, { id: favoriteItem.id }],
        queryFn: favoriteItem.mediaType === "tv" ? getTVShow : getMovie,
      }
    })
  });
  
  // Check if any of the parallel queries is still loading.
  const isPending = favoriteMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q, index) => {
    const mediaType = favorites[index].mediaType;
    const item = q.data;
    if (item.genres) {
      item.genre_ids = item.genres.map(g => g.id)
    }
    item.media_type = mediaType;
    if (mediaType === "tv") {
      item.title = item.name;
      item.release_date = item.first_air_date;
    }
    return item
  });

  return (
    <PageTemplate
      title="Favorites"
      movies={movies}
      showFilter={false}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            {movie.media_type === "movie" ? <WriteReview movie={movie} /> : null}
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;
