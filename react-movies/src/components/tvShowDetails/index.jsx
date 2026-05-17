import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MediaProjectsCarousel from "../mediaProjectsCarousel";


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

const TVShowDetails = ({ tvShow, credits }) => {
  const cast = credits?.cast?.slice(0, 15) ?? [];
  const crew = credits?.crew?.slice(0, 15) ?? [];

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>
      <Typography variant="body1" component="p" sx={{ mb: 3, color: "text.secondary" }}>
        {tvShow.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {tvShow.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <Chip label={`Seasons: ${tvShow.number_of_seasons}`} />
        <Chip label={`Episodes: ${tvShow.number_of_episodes}`} />
        <Chip label={`First air date: ${tvShow.first_air_date}`} />
        <Chip label={`Rating: ${tvShow.vote_average} (${tvShow.vote_count})`} />
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Production countries" sx={{ ...chip }} color="primary" />
        </li>
        {(tvShow.origin_country || []).map((country) => (
          <li key={country}>
            <Chip label={country} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <MediaProjectsCarousel title="Cast" items={cast} />
      <MediaProjectsCarousel title="Crew" items={crew} />
    </>
  );
};

export default TVShowDetails;
