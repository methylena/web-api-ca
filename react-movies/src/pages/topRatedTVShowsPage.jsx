import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getTopRatedTVShows } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const TopRatedTVShowsPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["topRatedTVShows"],
    queryFn: getTopRatedTVShows,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const shows = data.results.map((show) => ({
    ...show,
    title: show.name,
    release_date: show.first_air_date,
    media_type: "tv",
  }));

  return (
    <PageTemplate
      title="Top Rated Series"
      movies={shows}
      action={(show) => <AddToFavoritesIcon movie={show} />}
      showFilter={false}
    />
  );
};

export default TopRatedTVShowsPage;
