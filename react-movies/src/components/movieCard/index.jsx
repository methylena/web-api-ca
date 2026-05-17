import React, { useContext  } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistIcon from '@mui/icons-material/PlaylistAdd';
import Box from "@mui/material/Box";

export default function MovieCard({ movie, action, showDetailsButton = true }) {
  const { favorites } = useContext(MoviesContext);
  const { playlist } = useContext(MoviesContext);

  const mediaType = movie.media_type || movie.mediaType || "movie";
  const detailsPath = mediaType === "tv" ? `/tv/${movie.id}` : `/movies/${movie.id}`;
  const isFavorite = favorites.find((item) => item.id === movie.id && item.mediaType === mediaType);
  const isInPlaylist = playlist.find((id) => id === movie.id);
  const displayTitle = movie.title || movie.name;
  const displayDate = movie.release_date || movie.first_air_date;

  return (
    <Card sx={{ height: "100%", backgroundColor: "#ffffff", display: "flex", flexDirection: "column" }}>
      <CardHeader
  avatar={
    <Box sx={{ display: 'flex', gap: 1 }}>
      {isFavorite && (
        <Avatar sx={{ backgroundColor: '#ffffff', color: "#111827", border: "1px solid #e5e7eb" }}>
          <FavoriteIcon />
        </Avatar>
      )}
      {isInPlaylist && (
        <Avatar sx={{ backgroundColor: '#d1d5db', color: "#111827" }}>
          <PlaylistIcon />
        </Avatar>
      )}
    </Box>
  }
  title={
    <Typography
      variant="h6"
      component="p"
      sx={{
        fontSize: 16,
        fontWeight: 600,
        minHeight: 64,
        display: "-webkit-box",
        overflow: "hidden",
        textOverflow: "ellipsis",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        lineHeight: 1.3,
      }}
    >
      {displayTitle}
    </Typography>
  }
  sx={{ borderBottom: "1px solid #e5e7eb" }}
/>

      <CardMedia
        sx={{ height: 380, flexShrink: 0, backgroundSize: "cover" }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent sx={{ borderTop: "1px solid #e5e7eb", minHeight: 72 }}>
        <Grid container spacing={1}>
          <Grid size={{xs: 6}}>
            <Typography variant="body1" component="p" color="text.secondary">
              <CalendarIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }} />
              {displayDate}
            </Typography>
          </Grid>
          <Grid size={{xs: 6}}>
            <Typography variant="body1" component="p" color="text.secondary">
              <StarRateIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }} />
              {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ px: 2, pb: 2, pt: 0, justifyContent: "space-between", marginTop: "auto" }}
      >
      {action(movie)}
      {showDetailsButton ? (
        <Link to={detailsPath}>
          <Button variant="outlined" size="medium" color="primary">
            More info
          </Button>
        </Link>
      ) : (
        <Box />
      )}
    
    </CardActions>
    </Card>
  );
}
