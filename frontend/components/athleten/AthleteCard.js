import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  CardActions,
} from "@material-ui/core";

import { FaBirthdayCake } from "react-icons/fa";
import { BsCalendar2Check } from "react-icons/bs";
import { IoScaleOutline, IoBarbellSharp } from "react-icons/io5";
import { GoLocation } from "react-icons/go";

import { getSinclairCoefficient } from "../../utils/sinclair";

const AthleteCard = ({ athlete }) => {
  const personalBests = {
    snatch: 0,
    cleanAndJerk: 0,
    total: 0,
    sinclair: 0,
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

      if (sn.weight > personalBests.snatch) personalBests.snatch = sn.weight;
      if (cj.weight > personalBests.cleanAndJerk)
        personalBests.cleanAndJerk = cj.weight;
      if (total.weight > personalBests.total)
        personalBests.total = total.weight;
      if (sinclair > personalBests.sinclair) personalBests.sinclair = sinclair;
    });
  return (
    <Card>
      <CardMedia
        component='img'
        image='/images/athleten/kathrein-christian.jpg'
        height={300}
      />
      <CardContent>
        <Grid container direction='column' alignItems='flex-start' spacing={1}>
          <Grid item>
            <Typography variant='h3'>{athlete.attributes.fullName}</Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              <FaBirthdayCake />{" "}
              <Moment format='DD.MM.YYYY'>
                {athlete.attributes.dateOfBirth}
              </Moment>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              <IoScaleOutline /> {athlete.attributes.weightclass}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              <GoLocation /> {athlete.attributes.placeOfBirth}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              <IoBarbellSharp /> {personalBests.snatch} kg /{" "}
              {personalBests.cleanAndJerk} kg / {personalBests.total} kg /{" "}
              {personalBests.sinclair} SP
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          color='primary'
          fullWidth
          component='a'
          href={`athleten/${athlete.attributes.slug}`}
        >
          {athlete.attributes.gender === "MALE"
            ? "zum Athleten"
            : "zur Athletin"}
        </Button>
      </CardActions>
    </Card>
  );
};

AthleteCard.propTypes = {
  athlete: PropTypes.object.isRequired,
};

export default AthleteCard;
