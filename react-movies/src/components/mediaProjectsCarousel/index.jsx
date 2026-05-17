import React, { useRef } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router";
import img from "../../images/film-poster-placeholder.png";

const rowSx = {
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

const MediaProjectsCarousel = ({ title, items }) => {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({
      left: direction === "left" ? -220 : 220,
      behavior: "smooth",
    });
  };

  return (
    <Paper sx={{ mt: 3, p: 2, border: "1px solid #d1d5db", backgroundColor: "#ffffff" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
        <Box>
          <IconButton onClick={() => scrollRow("left")} aria-label={`scroll ${title} left`}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => scrollRow("right")} aria-label={`scroll ${title} right`}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Box ref={rowRef} sx={rowSx}>
        {items.map((item) => {
          const mediaType = item.media_type || item.mediaType || "movie";
          const itemTitle = item.title || item.name;
          const detailsPath = mediaType === "tv" ? `/tv/${item.id}` : `/movies/${item.id}`;
          const roleText = item.character || item.job || item.department || item.known_for_department;

          return (
            <Link key={`${mediaType}-${item.id}-${item.credit_id || itemTitle}`} to={detailsPath}>
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
                    item.poster_path || item.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${item.poster_path || item.backdrop_path}`
                      : img
                  }
                  alt={itemTitle}
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
                  {itemTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {roleText || mediaType}
                </Typography>
              </Paper>
            </Link>
          );
        })}
      </Box>
    </Paper>
  );
};

export default MediaProjectsCarousel;
