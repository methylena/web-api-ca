import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useQueries } from '@tanstack/react-query';
import { getGenres } from "../../api/tmdb-api";
import Spinner from '../spinner';

const formControl = 
  {
    width: "100%",
    backgroundColor: "#ffffff"
  };

export default function FilterMoviesCard(props) {

  const results = useQueries({
    queries: [
      { queryKey: ['genres'], queryFn: getGenres },
    
    ]
  });
  
  const isPending = results.some((r) => r.isPending);
  const isError = results.some((r) => r.isError);
  
  if (isPending) return <Spinner />;
  if (isError) return <h1>Error loading data</h1>;
  
  const genres = results[0].data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }
  

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleCountryChange = (e) => {
    handleChange(e, "country", e.target.value);
  };


      
  return (
    <Card 
      sx={{
        width: "100%",
        maxWidth: 260,
        margin: 0,
        backgroundColor: "#ffffff",
        border: "1px solid #e7c2cf",
        minHeight: 420,
      }} 
      variant="outlined">
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h4" sx={{ fontWeight: 600 }}>
            <SearchIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
            Filter movies
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Search by title or choose a genre.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 3 }}>
          <TextField
            sx={{...formControl}}
            id="filled-search"
            label="Movie title"
            type="search"
            variant="outlined"
            value={props.titleFilter}
            onChange={handleTextChange}
          />
          <FormControl sx={{...formControl}}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              label="Genre"
              defaultValue=""
              value={props.genreFilter}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => {
                return (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{...formControl}}>
            <InputLabel id="country-label">Production country</InputLabel>
            <Select
              labelId="country-label"
              id="country-select"
              label="Production country"
              defaultValue=""
              value={props.countryFilter}
              onChange={handleCountryChange}
            >
              {props.countries.map((country) => {
                return (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );
}
