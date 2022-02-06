import React from "react";
import axios from "axios";
import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AthleteCard from "../../components/athleten/AthleteCard";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.breakpoints.values.maxWidth,
    margin: "auto",
    width: "100%",
  },
  outerContainer: { padding: "2rem" },
  heading: {
    margin: "auto",
    marginBottom: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1rem",
    },
  },
}));

const index = ({ athletes }) => {
  const classes = useStyles();
  return (
    <div className={classes.outerContainer}>
      <Typography
        variant='h1'
        align='center'
        classes={{ root: classes.heading }}
      >
        Athleten
      </Typography>
      <Grid
        container
        classes={{ root: classes.container }}
        justifyContent='center'
        spacing={3}
      >
        {athletes &&
          athletes.map((athlete, id) => (
            <Grid key={athlete.attributes.slug} item xs={12} sm={6} xl={4}>
              <AthleteCard athlete={athlete} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default index;

export const getServerSideProps = async (context) => {
  let data = null;

  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_STRAPI_URL +
        "/api/athletes?filters[isActive]=true&populate[0]=personalInformation.name&populate[1]=results"
    );

    data = res.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      athletes: data && data.data,
    },
  };
};
