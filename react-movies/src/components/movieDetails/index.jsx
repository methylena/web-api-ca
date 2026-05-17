import React, { useRef, useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import { useQuery } from "@tanstack/react-query";
import { getCast } from "../../api/tmdb-api";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import img from "../../images/film-poster-placeholder.png";



const root = {
  display: "flex",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
  gap: 1,
  border: "1px solid #d1d5db",
  backgroundColor: "#ffffff",
};
const chip = { margin: 0.5 };
const castCarousel = {
  display: "flex",
  gap: 2,
  overflowX: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  scrollBehavior: "smooth",
  py: 1,
  px: 0.5,
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const castRef = useRef(null);
  const crewRef = useRef(null);

  const { data: castData, isPending, isError, error } = useQuery({
    queryKey: ["cast", { id: movie.id }],
    queryFn: getCast,
  });
  
  const cast = castData?.cast?.slice(0, 10) ?? [];
  const crew = castData?.crew?.slice(0, 10) ?? [];

  const scrollRow = (ref, direction) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: direction === "left" ? -220 : 220,
      behavior: "smooth",
    });
  };


  
  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="body1" component="p" sx={{ mb: 3, color: "text.secondary" }}>
        {movie.overview}
      </Typography>

      <Paper
        component="ul"
        sx={{ ...root }}
      >
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper
        component="ul"
        sx={{ ...root }}
      >
        <li>
          <Chip label="Production countries" sx={{ ...chip }} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      <Paper sx={{ mt: 3, p: 2, border: "1px solid #d1d5db", backgroundColor: "#ffffff" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" component="h3">
            Cast
          </Typography>
          <Box>
            <IconButton onClick={() => scrollRow(castRef, "left")} aria-label="scroll cast left">
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => scrollRow(castRef, "right")} aria-label="scroll cast right">
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        {isPending ? (
          <Typography variant="body2" color="text.secondary">
            Loading cast...
          </Typography>
        ) : null}
        {isError ? (
          <Typography variant="body2" color="error">
            {error.message}
          </Typography>
        ) : null}
        <Box ref={castRef} sx={castCarousel}>
          {cast.map((actor) => (
            <Link
              key={actor.credit_id}
              to={`/person/${actor.id}`}
              state={{ actor, movie }}
            >
              <Paper
                sx={{
                  width: 160,
                  minWidth: 160,
                  p: 1.5,
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#fafafa",
                }}
              >
                <Box
                  component="img"
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                      : img
                  }
                  alt={actor.name}
                  sx={{
                    display: "block",
                    width: "100%",
                    height: 210,
                    objectFit: "cover",
                    mb: 1.5,
                  }}
                />
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    fontWeight: 600,
                    minHeight: 44,
                    display: "-webkit-box",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {actor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {actor.character}
                </Typography>
              </Paper>
            </Link>
          ))}
        </Box>
      </Paper>
      <Paper sx={{ mt: 3, p: 2, border: "1px solid #d1d5db", backgroundColor: "#ffffff" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" component="h3">
            Crew
          </Typography>
          <Box>
            <IconButton onClick={() => scrollRow(crewRef, "left")} aria-label="scroll crew left">
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => scrollRow(crewRef, "right")} aria-label="scroll crew right">
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        {isPending ? (
          <Typography variant="body2" color="text.secondary">
            Loading crew...
          </Typography>
        ) : null}
        {isError ? (
          <Typography variant="body2" color="error">
            {error.message}
          </Typography>
        ) : null}
        <Box ref={crewRef} sx={castCarousel}>
          {crew.map((person) => (
            <Link
              key={person.credit_id}
              to={`/person/${person.id}`}
              state={{ actor: person, movie }}
            >
              <Paper
                sx={{
                  width: 160,
                  minWidth: 160,
                  p: 1.5,
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#fafafa",
                }}
              >
                <Box
                  component="img"
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                      : img
                  }
                  alt={person.name}
                  sx={{
                    display: "block",
                    width: "100%",
                    height: 210,
                    objectFit: "cover",
                    mb: 1.5,
                  }}
                />
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    fontWeight: 600,
                    minHeight: 44,
                    display: "-webkit-box",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {person.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {person.job || person.department}
                </Typography>
              </Paper>
            </Link>
          ))}
        </Box>
      </Paper>
      <Fab
        color="primary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em',
          border: "1px solid #9ca3af",
          backgroundColor: "#ffffff",
          color: "#111827"
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};
export default MovieDetails;
