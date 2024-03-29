import React from "react";
import axios from "axios";
import { Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import GeneralInfo from "../../components/athleten/GeneralInfo";
import ResultsTable from "../../components/athleten/ResultsTable";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    maxWidth: theme.breakpoints.values.maxWidth,
    margin: "auto",
    padding: "0 2rem 1rem 2rem",
  },
}));

const Athlete = ({ athlete }) => {
  const classes = useStyles();
  const matchesLG = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const matchesMD = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  console.log(athlete);

  console.log(matchesLG, matchesMD, matchesSM);

  return (
    <div className={classes.outerContainer}>
      <Typography variant='h1'>{athlete.attributes.fullName}</Typography>
      <GeneralInfo athlete={athlete} />
      <Typography variant='h2' style={{ margin: "2rem auto" }}>
        Wettkämpfe
      </Typography>
      <ResultsTable
        results={athlete.attributes.results.data}
        gender={athlete.attributes.gender.toLowerCase()}
      />
    </div>
  );
};

export default Athlete;

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  let data = null;

  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_STRAPI_URL +
        `/api/athletes?filters[slug]=${slug}&populate[0]=results.competitions.title&populate[1]=records&populate[2]=results.competitions.location&populate[3]=image`
    );

    data = res.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      athlete: data && data.data[0],
    },
  };
};
