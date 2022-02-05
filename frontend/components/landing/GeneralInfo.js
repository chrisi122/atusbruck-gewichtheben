import React from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";

import { FaRegCalendar } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
  },
  innerContainer: {
    margin: "auto",
    padding: "3rem 2rem",
    maxWidth: theme.breakpoints.values.maxWidth,
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem 2rem",
    },
  },
  item: {
    padding: "0 2rem",
    "&:first-of-type": {
      borderRight: "1px solid white",
      [theme.breakpoints.down("sm")]: {
        borderBottom: "1px solid white",
        borderRight: "none",
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: "2rem 0rem",
    },
    "& > *": {
      padding: "0.5rem 0",
    },
    "& > *:first-of-type": {
      paddingTop: 0,
    },
  },
}));

const GeneralInfo = ({ contactInfos, trainingTime }) => {
  const classes = useStyles();
  const matchesMD = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const matchesLG = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <div className={classes.container}>
      <Grid container columns={2} classes={{ root: classes.innerContainer }}>
        <Grid
          item
          md={6}
          xs={12}
          container
          alignItems={matchesMD ? "flex-end" : "flex-start"}
          justifyContent={matchesLG ? "space-between" : "flex-start"}
          classes={{ root: classes.item }}
          direction='column'
        >
          <Grid item>
            <Typography variant='h3' color='inherit'>
              Nächste Termine
            </Typography>
          </Grid>
          <Grid item container direction='column' justifyContent='flex-end'>
            <CalenderItem
              title={"Österreichische Meisterschaften U15/U17/U20/U23"}
              date={"24.11.2021 - 25.11.2021"}
              location={"Linz"}
              align={matchesMD ? "right" : "left"}
            />
          </Grid>

          <Grid item container direction='column' justifyContent='flex-end'>
            <CalenderItem
              title={"Österreichische Meisterschaften U15/U17/U20/U23"}
              date={"24.11.2021 - 25.11.2021"}
              location={"Linz"}
              align={matchesMD ? "right" : "left"}
            />
          </Grid>

          <Grid item container direction='column' justifyContent='flex-end'>
            <CalenderItem
              title={"Österreichische Meisterschaften U15/U17/U20/U23"}
              date={"24.11.2021 - 25.11.2021"}
              location={"Linz"}
              align={matchesMD ? "right" : "left"}
            />
          </Grid>

          <Grid item container direction='column' justifyContent='flex-end'>
            <CalenderItem
              title={"Österreichische Meisterschaften U15/U17/U20/U23"}
              date={"24.11.2021 - 25.11.2021"}
              location={"Linz"}
              align={matchesMD ? "right" : "left"}
            />
          </Grid>
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
          classes={{ root: classes.item }}
          container
          direction='row'
        >
          <Grid item xs={12}>
            <Typography variant='h3' color='inherit'>
              Trainingszeiten
            </Typography>
          </Grid>
          {trainingTime &&
            trainingTime.map((item) => (
              <Grid key={item.title} item lg={6} md={12} sm={6} xs={12}>
                <TrainingTimeItem
                  title={item.title}
                  times={item.time.map((time) => time.text)}
                />
              </Grid>
            ))}
          <Grid item xs={12}>
            <Typography variant='h3' color='inherit'>
              Kontakt
            </Typography>
          </Grid>
          {contactInfos &&
            contactInfos.map((info) => (
              <Grid
                key={info.attributes.email}
                item
                lg={6}
                md={12}
                sm={6}
                xs={12}
              >
                <ContactItem
                  title={info.attributes.title}
                  name={info.attributes.name}
                  email={info.attributes.email}
                  phone={info.attributes.phone}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default GeneralInfo;

const ContactItem = ({ title, name, email, phone }) => {
  return (
    <>
      <Typography variant='body1' style={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant='body1'>{name}</Typography>
      <Typography variant='body1'>
        <Link href={`mailto:${email}`} color='inherit' underline='always'>
          {email}
        </Link>
      </Typography>
      <Typography variant='body1'>
        <Link href={`tel:${phone}`} color='inherit' underline='always'>
          {phone}
        </Link>
      </Typography>
    </>
  );
};

const TrainingTimeItem = ({ title, times }) => {
  return (
    <>
      <Typography variant='body1' style={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {times.map((el, i) => (
        <Typography key={`TT_${i}`} variant='body1'>
          {el}
        </Typography>
      ))}
    </>
  );
};

const CalenderItem = ({ title, date, location, align }) => {
  return (
    <>
      <Typography variant='body1' align={align || "right"}>
        <FaRegCalendar /> {date}
      </Typography>
      <Typography
        variant='body1'
        align={align || "right"}
        style={{ fontWeight: 600 }}
      >
        {title}
      </Typography>
      <Typography variant='body1' align={align || "right"}>
        <FiMapPin /> {location}
      </Typography>
    </>
  );
};
