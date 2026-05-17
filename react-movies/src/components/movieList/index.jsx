import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";

const MovieList = (props) => {
  let movieCards = props.movies.map((m) => (
    <Grid
      key={m.id}
      size={{xs: 12, sm: 6, md: 4}}
      sx={{
        padding: "10px",
        flexBasis: { lg: "20%", xl: "20%" },
        maxWidth: { lg: "20%", xl: "20%" },
      }}
    >
      {/* <Movie key={m.id} movie={m} /> */}
      <Movie
        key={m.id}
        movie={m}
        action={props.action}
        showDetailsButton={props.showDetailsButton}
      />
    </Grid>
  ));
  return movieCards;
};

export default MovieList;
