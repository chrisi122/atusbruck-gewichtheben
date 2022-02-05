import React from "react";
import { makeStyles } from "@material-ui/styles";
import { alpha } from "@material-ui/core/styles/colorManipulator";

const useStyles = makeStyles((theme) => ({
  heroImage: {
    width: "100vw",
    backgroundImage: `linear-gradient(135deg, ${alpha(
      theme.palette.primary.dark,
      0.4
    )}, ${alpha(
      theme.palette.primary.dark,
      0.6
    )}), url(/images/hero-block/hero-image.jpg)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    maxWidth: "800px",
    margin: "4rem auto 9rem auto",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

const HeroBlock = () => {
  const classes = useStyles();
  return (
    <div className={classes.heroImage}>
      <img className={classes.logo} src='/images/logo/ATUS_oK_weiss.png' />
    </div>
  );
};

export default HeroBlock;
