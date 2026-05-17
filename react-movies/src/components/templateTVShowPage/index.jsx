import React from "react";
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Spinner from "../spinner";
import img from "../../images/film-poster-placeholder.png";
import MovieHeader from "../headerMovie";
import { getTVShowImages } from "../../api/tmdb-api";

const TemplateTVShowPage = ({ tvShow, children }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["tvImages", { id: tvShow.id }],
    queryFn: getTVShowImages,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const poster = data.posters?.[0]?.file_path
    ? `https://image.tmdb.org/t/p/w500/${data.posters[0].file_path}`
    : tvShow.poster_path
      ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
      : img;

  const headerShow = {
    ...tvShow,
    title: tvShow.name,
    tagline: tvShow.tagline,
  };

  return (
    <Box sx={{ backgroundColor: "#fdf1f5", minHeight: "100vh" }}>
      <MovieHeader movie={headerShow} />

      <Grid container spacing={4} sx={{ p: 3 }}>
        <Grid size={{xs: 12, md: 3}}>
          <Paper sx={{ border: "1px solid #d1d5db", p: 2, backgroundColor: "#ffffff" }}>
            <Box
              component="img"
              src={poster}
              alt={tvShow.name}
              sx={{
                display: "block",
                width: "100%",
                height: { xs: 420, md: 560 },
                objectFit: "cover",
              }}
            />
          </Paper>
        </Grid>

        <Grid size={{xs: 12, md: 9}}>
          <Paper sx={{ border: "1px solid #d1d5db", p: 3, backgroundColor: "#ffffff" }}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TemplateTVShowPage;
