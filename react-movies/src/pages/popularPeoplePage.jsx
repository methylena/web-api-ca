import React from "react";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { Link } from "react-router";
import Spinner from "../components/spinner";
import Header from "../components/headerMovieList";
import { getPopularPeople } from "../api/tmdb-api";
import img from "../images/film-poster-placeholder.png";

const PopularPeoplePage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["popularPeople"],
    queryFn: getPopularPeople,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const people = data.results;

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
      <Header title="Popular People" />
      <Grid container>
        {people.map((person) => (
          <Grid key={person.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} sx={{ p: "10px" }}>
            <Link to={`/person/${person.id}`} state={{ actor: person }}>
              <Card sx={{ height: "100%", backgroundColor: "#ffffff" }}>
                <CardMedia
                  sx={{ height: 340 }}
                  image={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                      : img
                  }
                />
                <CardContent>
                  <Typography variant="h6" component="p" sx={{ fontWeight: 600 }}>
                    {person.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {person.known_for_department || "Not specified"}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularPeoplePage;
