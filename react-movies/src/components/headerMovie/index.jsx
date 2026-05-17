import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
const MovieHeader = (props) => {
  const movie = props.movie;
  const navigate = useNavigate();

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: 2,
        margin: 0,
        borderBottom: "1px solid #d1d5db",
        backgroundColor: "#ffffff",
      }}
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)} >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Box sx={{ flex: 1, px: 2, textAlign: "center" }}>
        <Typography variant="h4" component="h3" sx={{ fontWeight: 600 }}>
          {movie.title}
          {movie.homepage ? (
            <a href={movie.homepage}>
              <HomeIcon color="primary" sx={{ ml: 1, verticalAlign: "middle" }} />
            </a>
          ) : null}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {movie.tagline}
        </Typography>
      </Box>

      <IconButton aria-label="go forward" onClick={() => navigate(+1)} >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
