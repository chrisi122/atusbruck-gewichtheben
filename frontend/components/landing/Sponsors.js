import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    maxWidth: theme.breakpoints.values.maxWidth,
    padding: "2rem",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      padding: "3rem",
    },
  },
  innerContainer: {
    width: "100%",
    margin: "auto",
  },
}));

const Sponsors = () => {
  const classes = useStyles();
  return (
    <div className={classes.outerContainer}>
      <Grid container spacing={8} classes={{ root: classes.innerContainer }}>
        <Grid item sm={6} xs={12}>
          <img src='/images/sponsors/sponsor1.png' />
        </Grid>
        <Grid item sm={6} xs={12}>
          <img src='/images/sponsors/sponsor2.png' />
        </Grid>
        <Grid item sm={6} xs={12}>
          <img src='/images/sponsors/sponsor4.svg' />
        </Grid>
        <Grid item sm={6} xs={12}>
          <img src='/images/sponsors/sponsor3.png' />
        </Grid>
      </Grid>
    </div>
  );
};

export default Sponsors;
