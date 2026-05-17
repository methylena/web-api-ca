import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import img from "../../images/film-poster-placeholder.png";
import MediaProjectsCarousel from "../mediaProjectsCarousel";

const getGenderLabel = (gender) => {
  if (gender === 1) return "Female";
  if (gender === 2) return "Male";
  return "N/A";
};

const profileImage = (profilePath) =>
  profilePath ? `https://image.tmdb.org/t/p/w500/${profilePath}` : img;

const infoCardSx = {
  p: 3,
  height: "100%",
  color: "#111827",
  backgroundColor: "#ffffff",
  border: "1px solid #d1d5db",
};

const TemplateActorPage = ({ actor, credits }) => {
  const navigate = useNavigate();
  const displayName = actor.original_name || actor.name;
  const knownProjects = [...(credits?.cast || []), ...(credits?.crew || [])]
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 12);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fdf1f5",
        px: { xs: 2, md: 4 },
        py: 3,
      }}
    >
      <Box sx={{ mb: 1, display: "inline-flex", justifyContent: "flex-start" }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              ...infoCardSx,
              overflow: "hidden",
              p: 2,
            }}
          >
            <Box
              component="img"
              src={profileImage(actor.profile_path)}
              alt={displayName}
              sx={{
                display: "block",
                width: "100%",
                maxHeight: { xs: 520, md: 900 },
                objectFit: "cover",
              }}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Paper elevation={0} sx={infoCardSx}>
                <Typography
                  variant="overline"
                  component="p"
                  sx={{ color: "#6b7280", letterSpacing: 2 }}
                >
                  Actor Profile
                </Typography>
                <Typography variant="h2" component="h2" sx={{ fontWeight: 700 }}>
                  {displayName}
                </Typography>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{ mt: 1, color: "#4b5563" }}
                >
                  Known for: {actor.known_for_department || "Not specified"}
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={0} sx={infoCardSx}>
                <Typography variant="overline" component="p" sx={{ letterSpacing: 2 }}>
                  Original Name
                </Typography>
                <Typography variant="h4" component="p" sx={{ mt: 1, fontWeight: 600 }}>
                  {displayName}
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={0} sx={infoCardSx}>
                <Typography variant="overline" component="p" sx={{ letterSpacing: 2 }}>
                  Primary Department
                </Typography>
                <Typography variant="h4" component="p" sx={{ mt: 1, fontWeight: 600 }}>
                  {actor.known_for_department || "Not specified"}
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={0} sx={infoCardSx}>
                <Typography variant="overline" component="p" sx={{ letterSpacing: 2 }}>
                  Gender
                </Typography>
                <Chip
                  label={getGenderLabel(actor.gender)}
                  sx={{
                    mt: 2,
                    fontSize: "2rem",
                    color: "#111827",
                    backgroundColor: "#e5e7eb",
                    fontWeight: 600,
                    border: "px solid #d1d5db",
                  }}
                />
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={0} sx={infoCardSx}>
                <Typography variant="overline" component="p" sx={{ letterSpacing: 2 }}>
                  Birthday
                </Typography>
                <Typography variant="h4" component="p" sx={{ mt: 1, fontWeight: 600 }}>
                  {actor.birthday || "Confidential"}
                  
                </Typography>
              </Paper>
            </Grid>
          </Grid>
            <MediaProjectsCarousel title="Known Projects" items={knownProjects} />
        </Grid>
      
      </Grid>
      
    </Box>
  );
};

export default TemplateActorPage;
