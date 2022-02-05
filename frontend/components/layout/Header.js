import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Tabs,
  Tab,
  AppBar,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { FaFacebook, FaInstagram, FaYoutube, FaBars } from "react-icons/fa";

const getHeaderItems = async () => {
  let data = null;

  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_STRAPI_URL +
        "/api/header?populate[0]=socials&populate[1]=menu"
    );

    data = res.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      headerItems: data && data.data,
    },
  };
};

const useStyles = makeStyles((theme) => ({
  innerContainer: {
    maxWidth: theme.breakpoints.values.maxWidth,
    margin: "auto",
  },
  outerContainer: {
    borderBottom: `0.5rem solid`,
    borderImageSource: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    borderImageSlice: "0 1 100% 1",
    padding: "0.75rem 2rem",
  },
  menuLink: {
    color: "#000",
    fontWeight: 400,
    boxSizing: "border-box",
    padding: "0.25rem 1rem",
    minWidth: 0,
    minHeight: 0,
    letterSpacing: "0.075rem",
    "&:hover": {
      opacity: 1,
      color: theme.palette.primary.dark,
    },
  },
  tabs: {
    minHeight: 0,
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    width: "8rem",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "none",
      width: "6rem",
    },
  },
  logoContainer: {
    padding: 0,
    borderRadius: 0,
  },
  "@global": {
    ".MuiIconButton-root:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const Header = ({ trainingTime }) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [headerItems, setHeaderItems] = useState({
    menu: [
      { label: "News", route: "news" },
      { label: "Wettkämpfe", route: "wettkaempfe" },
      { label: "Verein", route: "verein" },
      { label: "Rekorde", route: "rekorde" },
      { label: "Sinclair-Rechner", route: "sinclair-rechner" },
    ],
    socials: [
      {
        "id": 1,
        "media": "facebook",
        "link":
          "https://www.facebook.com/ATUS-Bruck-an-der-Mur-Gewichtheben-171591662891521",
        "icon": "FaFacebook",
      },
      {
        "id": 2,
        "media": "instagram",
        "link": "https://www.instagram.com/atusbruck_gewichtheben",
        "icon": "FaInstagram",
      },
      {
        "id": 3,
        "media": "youtube",
        "link": "https://www.youtube.com/user/atusbruckgwh",
        "icon": "FaYoutube",
      },
    ],
  });
  const matchesResponsiveMenu = useMediaQuery((theme) =>
    theme.breakpoints.up("responsiveMenu")
  );

  useEffect(() => {
    getHeaderItems().then((res) => {
      res.props.headerItems &&
        setHeaderItems({ ...res.props.headerItems.attributes });
    });
  }, []);

  useEffect(() => {
    matchesResponsiveMenu && setDrawerOpen(false);
  }, [matchesResponsiveMenu]);

  return (
    <AppBar
      className={classes.outerContainer}
      position='static'
      color='transparent'
    >
      <Grid
        container
        classes={{ root: classes.innerContainer }}
        alignItems='center'
      >
        <Grid item xs={2}>
          <IconButton classes={{ root: classes.logoContainer }}>
            <img
              src='/images/logo/ATUS_ok_rot_schwarz_small.png'
              className={classes.logo}
            ></img>
          </IconButton>
        </Grid>
        {matchesResponsiveMenu ? (
          <>
            <Grid
              item
              xs={8}
              container
              justifyContent='center'
              alignItems='center'
            >
              <Menu
                menu={headerItems && headerItems.menu}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </Grid>
            <Grid item xs={2} container justifyContent='flex-end'>
              <Socials socials={headerItems && headerItems.socials} />
            </Grid>
          </>
        ) : (
          <Grid item xs={10} container justifyContent='flex-end'>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <FaBars />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <Drawer
        open={!matchesResponsiveMenu && drawerOpen}
        anchor='right'
        onClose={() => setDrawerOpen(false)}
      >
        <MobileMenu
          menu={headerItems && headerItems.menu}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Divider />
        <Grid container justifyContent='center'>
          <Socials socials={headerItems && headerItems.socials} />
        </Grid>
      </Drawer>
    </AppBar>
  );
};

export default Header;

const Socials = ({ socials }) => {
  const icons = {
    instagram: <FaInstagram />,
    facebook: <FaFacebook />,
    youtube: <FaYoutube />,
  };

  return (
    <>
      {socials &&
        socials.map((item) => (
          <IconButton
            key={item.media}
            component='a'
            href={item.link}
            target='_blank'
          >
            {icons[item.media]}
          </IconButton>
        ))}
    </>
  );
};

const MobileMenu = ({ menu, activeTab, setActiveTab }) => {
  return (
    <List>
      {menu &&
        menu.map((el, i) => (
          <ListItem
            button
            key={`MobileMenu-${el.label}`}
            selected={activeTab === i}
            onClick={() => setActiveTab(i)}
          >
            <ListItemText primary={el.label} />
          </ListItem>
        ))}
    </List>
  );
};

const Menu = ({ menu, activeTab, setActiveTab }) => {
  const classes = useStyles();
  return (
    <Tabs
      value={activeTab}
      classes={{ root: classes.tabs, indicator: classes.indicator }}
    >
      {menu &&
        menu.map((el, i) => (
          <Tab
            key={el.label}
            classes={{
              root: classes.menuLink,
            }}
            label={el.label}
            onClick={() => setActiveTab(i)}
          />
        ))}
    </Tabs>
  );
};
