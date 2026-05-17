import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import TemplateActorPage from "../components/templateActorPage";
import Spinner from "../components/spinner";
import { getPerson, getPersonCombinedCredits } from "../api/tmdb-api";

const ActorPage = () => {
  const { id } = useParams();
  const personQuery = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPerson,
  });
  const creditsQuery = useQuery({
    queryKey: ["personCredits", { id }],
    queryFn: getPersonCombinedCredits,
  });

  if (personQuery.isPending || creditsQuery.isPending) {
    return <Spinner />;
  }

  if (personQuery.isError) {
    return <h1>{personQuery.error.message}</h1>;
  }

  if (creditsQuery.isError) {
    return <h1>{creditsQuery.error.message}</h1>;
  }

  return <TemplateActorPage actor={personQuery.data} credits={creditsQuery.data} />;
};

export default ActorPage;
