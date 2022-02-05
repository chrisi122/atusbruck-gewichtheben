import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.secondary.main,
    height: "200px",
    color: "white",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return <footer className={classes.footer}>Footer</footer>;
};

export default Footer;
