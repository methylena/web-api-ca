import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";

const genderLabel = (gender) => {
  if (gender === 1) return "Female";
  if (gender === 2) return "Male";
  return "Not specified";
};

const ActorHeader = ({ actor }) => {
  const navigate = useNavigate();

  return (
    <Paper
      component="header"
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        px: { xs: 2, md: 4 },
        py: 2,
        color: "#f8fafc",
        background:
          "linear-gradient(135deg, rgba(15,23,42,0.94), rgba(30,41,59,0.86))",
        borderBottom: "1px solid rgba(148,163,184,0.18)",
      }}
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ color: "#f8fafc" }} fontSize="large" />
      </IconButton>

      <Box sx={{ textAlign: "center", flex: 1 }}>
        <Typography variant="overline" component="p" sx={{ letterSpacing: 3 }}>
          Actor Profile
        </Typography>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
          {actor.original_name}
        </Typography>
        <Typography variant="subtitle1" component="p" sx={{ opacity: 0.82 }}>
          {genderLabel(actor.gender)} • as {actor.character}
        </Typography>
      </Box>

      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon sx={{ color: "#f8fafc" }} fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default ActorHeader;
