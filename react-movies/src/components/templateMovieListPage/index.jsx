import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../../api/tmdb-api";
import Spinner from "../spinner";

function MovieListPageTemplate({ movies, title, action, showFilter = true, showDetailsButton = true }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [countryFilter, setCountryFilter] = useState("0");
  const genreId = Number(genreFilter);

  const movieDetailQueries = useQueries({
    queries: movies
      .filter((item) => !item.production_countries && (item.media_type || item.mediaType || "movie") === "movie")
      .map((item) => ({
        queryKey: ["movie", { id: item.id }],
        queryFn: getMovie,
      })),
  });

  const isDetailsPending = movieDetailQueries.some((query) => query.isPending);
  const isDetailsError = movieDetailQueries.some((query) => query.isError);

  if (isDetailsPending) {
    return <Spinner />;
  }

  if (isDetailsError) {
    return <h1>Error loading movie details</h1>;
  }

  const detailMap = new Map(
    movieDetailQueries
      .filter((query) => query.data)
      .map((query) => [query.data.id, query.data])
  );

  const enrichedMovies = movies.map((item) => {
    if (item.production_countries || (item.media_type || item.mediaType || "movie") !== "movie") {
      return item;
    }
    const details = detailMap.get(item.id);
    return details ? { ...item, ...details } : item;
  });

  const getItemCountries = (item) => {
    if (item.production_countries?.length) {
      return item.production_countries.map((country) => country.name);
    }
    if (item.origin_country?.length) {
      return item.origin_country;
    }
    return [];
  };

  const countries = enrichedMovies.reduce((acc, item) => {
    getItemCountries(item).forEach((country) => {
      if (!acc.find((entry) => entry.name === country)) {
        acc.push({ id: country, name: country });
      }
    });
    return acc;
  }, [{ id: "0", name: "All" }]);

  let displayedMovies = enrichedMovies
    .filter((m) => {
      const itemTitle = (m.title || m.name || "").toLowerCase();
      return itemTitle.search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      if (countryFilter === "0") {
        return true;
      }
      return getItemCountries(m).includes(countryFilter);
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else setCountryFilter(value);
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
    <Grid container spacing={3} alignItems="flex-start">
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      {showFilter ? (
        <Grid size={{ xs: 12, md: 2 }}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            countryFilter={countryFilter}
            countries={countries}
          />
        </Grid>
      ) : null}
      <Grid size={{ xs: 12, md: showFilter ? 10 : 12 }}>
        <Grid container sx={{flex: "1 1 500px"}}>
          <MovieList
            action={action}
            movies={displayedMovies}
            showDetailsButton={showDetailsButton}
          ></MovieList>
        </Grid>
      </Grid>
    </Grid>
    </Box>
  );
}
export default MovieListPageTemplate;
