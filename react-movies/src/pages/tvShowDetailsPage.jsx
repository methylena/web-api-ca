import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import TemplateTVShowPage from "../components/templateTVShowPage";
import TVShowDetails from "../components/tvShowDetails";
import { getTVShow, getTVCredits } from "../api/tmdb-api";

const TVShowPage = () => {
  const { id } = useParams();
  const { data: tvShow, error, isPending, isError  } = useQuery({
    queryKey: ['tvShow', {id: id}],
    queryFn: getTVShow,
  })
  const creditsQuery = useQuery({
    queryKey: ["tvCredits", { id }],
    queryFn: getTVCredits,
  });

  if (isPending || creditsQuery.isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (creditsQuery.isError) {
    return <h1>{creditsQuery.error.message}</h1>;
  }

  return (
    <TemplateTVShowPage tvShow={tvShow}>
      <TVShowDetails tvShow={tvShow} credits={creditsQuery.data} />
    </TemplateTVShowPage>
  );
}


export default TVShowPage;
