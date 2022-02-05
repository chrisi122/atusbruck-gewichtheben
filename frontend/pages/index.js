import React, { useEffect } from "react";
import axios from "axios";
import GeneralInfo from "../components/landing/GeneralInfo";
import HeroBlock from "../components/landing/HeroBlock";
import NewsBlock from "../components/landing/NewsBlock";
import Sponsors from "../components/landing/Sponsors";

const index = ({ trainingTime, contactInfos }) => {
  return (
    <>
      <HeroBlock />
      <NewsBlock />
      <GeneralInfo trainingTime={trainingTime} contactInfos={contactInfos} />
      <Sponsors />
    </>
  );
};

export default index;

export const getServerSideProps = async (context) => {
  let data = null;

  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_STRAPI_URL +
        "/api/landing-page?populate[0]=contactInfos&populate[1]=trainingTime.time"
    );

    data = res.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      trainingTime: data && data.data.attributes.trainingTime,
      contactInfos: data && data.data.attributes.contactInfos.data,
    },
  };
};
