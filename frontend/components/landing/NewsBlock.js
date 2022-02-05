import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import NewsCard from "../news/NewsCard";

const useStyles = makeStyles((theme) => ({
  container: {
    transform: "translateY(-5rem)",
    width: "100%",
    margin: "0 auto",
    padding: "0 1.5rem",
  },
  outerContainer: {
    width: "100vw",
    maxWidth: theme.breakpoints.values.maxWidth,
    margin: "auto",
  },
}));

const NewsBlock = () => {
  const classes = useStyles();

  return (
    <div className={classes.outerContainer}>
      <Grid
        container
        justifyContent='center'
        spacing={3}
        classes={{ root: classes.container }}
      >
        <Grid item lg={4} md={12} xs={12}>
          <NewsCard />
        </Grid>
        <Grid item lg={4} md={12} xs={12}>
          <NewsCard />
        </Grid>
        <Grid item lg={4} md={12} xs={12}>
          <NewsCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default NewsBlock;
