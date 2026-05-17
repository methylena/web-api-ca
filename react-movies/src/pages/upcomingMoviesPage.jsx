  import React from "react";
  import PageTemplate from "../components/templateMovieListPage";
  import { useQuery } from "@tanstack/react-query";  // useQuery not useQueries
  import { getUpcomingMovies } from "../api/tmdb-api";  
  import Spinner from '../components/spinner';
  import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';

  const UpcomingMoviesPage = () => {

    const { data, error, isPending, isError } = useQuery({
      queryKey: ['upcoming'],
      queryFn: getUpcomingMovies,  // fetch all upcoming movies at once
    });

    if (isPending) return <Spinner />;
    if (isError) return <h1>{error.message}</h1>;

    const movies = data.results;

    return (
      <PageTemplate
        title="Upcoming Movies"
        movies={movies}
        action={(movie) => <AddToPlaylistIcon movie={movie} />}
      />
    );
  };

  export default UpcomingMoviesPage;