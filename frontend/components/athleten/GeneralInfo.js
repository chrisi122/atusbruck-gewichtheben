import React from "react";
import Moment from "react-moment";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, useMediaQuery } from "@material-ui/core";

import { FaBirthdayCake } from "react-icons/fa";
import { BsCalendar2Check } from "react-icons/bs";
import {
  IoScaleOutline,
  IoBarbellSharp,
  IoTrophyOutline,
} from "react-icons/io5";
import { GoLocation } from "react-icons/go";

import { getSinclairCoefficient } from "../../utils/sinclair";

const useStyles = makeStyles((theme) => ({
  athleteItem: {
    "&:first-of-type": {
      padding: "2rem",
      paddingLeft: 0,
      borderRight: "0.25rem solid",
      borderImageSlice: "0 20 0 0",
      borderImageSource: `radial-gradient(circle at center, ${theme.palette.secondary.main}, transparent)`,
      [theme.breakpoints.down("sm")]: {
        border: "none",
        marginBottom: "2rem",
        padding: 0,
      },
    },
    "&:last-of-type": {
      paddingLeft: "2rem",
      [theme.breakpoints.down("sm")]: {
        padding: 0,
      },
    },
  },
  athleteImage: {
    boxShadow: theme.shadows[2],
    borderRadius: 5,
  },
}));

const GeneralInfo = ({ athlete }) => {
  const classes = useStyles();

  const matchesMD = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const personalBests = {
    snatch: { weight: 0, date: null, bw: 0 },
    cleanAndJerk: { weight: 0, date: null, bw: 0 },
    total: { weight: 0, date: null, bw: 0 },
    sinclair: { weight: 0, date: null, bw: 0 },
  };

  athlete.attributes.results.data
    .sort((a, b) => new Date(a.attributes.date) - new Date(b.attributes.date))
    .forEach((result) => {
      const sn = result.attributes.result.disciplines.find(
        (el) => el.type === "SNATCH"
      );
      const cj = result.attributes.result.disciplines.find(
        (el) => el.type === "CLEAN_AND_JERK"
      );
      const total = result.attributes.result.disciplines.find(
        (el) => el.type === "TOTAL"
      );
      const sinclair = Number(
        (
          getSinclairCoefficient(result.attributes.bodyweight)[
            athlete.attributes.gender.toLowerCase()
          ] * total.weight
        ).toFixed(2)
      );

      if (sn.weight > personalBests.snatch.weight)
        personalBests.snatch = {
          weight: sn.weight,
          date: result.attributes.date,
          bw: result.attributes.bodyweight,
        };
      if (cj.weight > personalBests.cleanAndJerk.weight)
        personalBests.cleanAndJerk = {
          weight: cj.weight,
          date: result.attributes.date,
          bw: result.attributes.bodyweight,
        };
      if (total.weight > personalBests.total.weight)
        personalBests.total = {
          weight: total.weight,
          date: result.attributes.date,
          bw: result.attributes.bodyweight,
        };
      if (sinclair > personalBests.sinclair.weight)
        personalBests.sinclair = {
          weight: sinclair,
          date: result.attributes.date,
          bw: result.attributes.bodyweight,
        };
    });

  return (
    <Grid container alignItems='center'>
      <Grid item md={6} xs={12} classes={{ root: classes.athleteItem }}>
        <img
          src={
            athlete.attributes.image.data &&
            process.env.NEXT_PUBLIC_STRAPI_URL +
              athlete.attributes.image.data.attributes.url
          }
          alt=''
          className={classes.athleteImage}
        />
      </Grid>
      <Grid
        item
        container
        direction='column'
        spacing={3}
        md={6}
        xs={12}
        classes={{ root: classes.athleteItem }}
      >
        <Grid item>
          <Typography variant='h2' style={{ marginBottom: "1rem" }}>
            Steckbrief
          </Typography>
          <Typography variant='body1'>
            <FaBirthdayCake />{" "}
            <Moment format='DD.MM.YYYY'>
              {athlete.attributes.dateOfBirth}
            </Moment>
          </Typography>
          <Typography variant='body1'>
            <GoLocation /> {athlete.attributes.placeOfBirth}
          </Typography>
          <Typography variant='body1'>
            <BsCalendar2Check />{" "}
            <Moment format='DD.MM.YYYY'>
              {athlete.attributes.clubEntryDate}
            </Moment>
          </Typography>
          <Typography variant='body1'>
            <IoScaleOutline /> {athlete.attributes.weightclass}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='h2' style={{ marginBottom: "1rem" }}>
            Bestleistungen
          </Typography>
          <Typography variant='body1'>
            <IoBarbellSharp /> Reißen: {personalBests.snatch.weight} kg (
            <Moment format='DD.MM.YYYY'>{personalBests.snatch.date}</Moment> /
            KGW: {personalBests.snatch.bw.toFixed(1)})
          </Typography>
          <Typography variant='body1'>
            <IoBarbellSharp /> Stoßen: {personalBests.cleanAndJerk.weight} kg (
            <Moment format='DD.MM.YYYY'>
              {personalBests.cleanAndJerk.date}
            </Moment>{" "}
            / KGW: {personalBests.cleanAndJerk.bw.toFixed(1)})
          </Typography>
          <Typography variant='body1'>
            <IoBarbellSharp /> Zweikampf: {personalBests.total.weight} kg (
            <Moment format='DD.MM.YYYY'>{personalBests.total.date}</Moment> /
            KGW: {personalBests.total.bw.toFixed(1)})
          </Typography>
          <Typography variant='body1'>
            <IoBarbellSharp /> Sinclair: {personalBests.sinclair.weight} kg (
            <Moment format='DD.MM.YYYY'>{personalBests.sinclair.date}</Moment> /
            KGW: {personalBests.sinclair.bw.toFixed(1)})
          </Typography>
        </Grid>
        {athlete.attributes.records && athlete.attributes.records.length > 0 && (
          <Grid item>
            <Typography variant='h2' style={{ marginBottom: "1rem" }}>
              Rekorde
            </Typography>
            {athlete.attributes.records.map((el, i) => (
              <Typography key={`record-${i}`} variant='body1'>
                <IoTrophyOutline /> {el.entry}
              </Typography>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default GeneralInfo;
