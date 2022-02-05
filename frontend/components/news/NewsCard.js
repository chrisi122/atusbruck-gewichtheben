import React from "react";
import clsx from "clsx";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStylesVertical = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  image: {
    width: "40%",
  },
}));

const NewsCard = ({ direction = "vertical" }) => {
  const classes = useStylesVertical({ image: "/images/news/news1.jpg" });
  return (
    <Card>
      <CardMedia
        component='img'
        image='/images/news/news1.jpg'
        height={300}
      ></CardMedia>
      <CardContent style={{ height: "95%" }}>
        <Grid
          container
          direction='column'
          spacing={2}
          justifyContent='space-between'
          style={{ height: "100%" }}
        >
          <Grid item>
            <Typography variant='h4'>
              STEIRISCHE Heberinnen GEWINNEN BUNDESLIGA MIT BRUCKER
              UNTERSTÜTZUNG
            </Typography>
            <Typography variant='subtitle1'>
              verfasst am 12.11.2021 von Kathrein Christian
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              Am Samstag dem 13.11 wurde im niederösterreichischen Stockerau das
              Finale der Gewichtheber-Damenbundesliga unter strengen Corona
              Auflagen ausgetragen. Dabei konnte sich das Team des steirischen
              Landesverbandes das erste Mal seit ihrem Bestehen zum
              Staatsmeister krönen. Neben der Grazer Athletin Anna Prattes und
              der Öblarnerin Sophia Stieg waren
            </Typography>
          </Grid>
          <Grid item>
            <Button variant='contained' color='primary' size='small' fullWidth>
              weiterlesen
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
