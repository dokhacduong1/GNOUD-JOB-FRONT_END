

import "./home.scss";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import imageSlider from "./images/1.jpg"
import { useEffect, useState } from "react";
import { getListEmployers } from "../../../services/clients/employersApi";
import SliderBanner from "../../../components/clients/sliderBanner";

import { decData } from "../../../helpers/decData";
import EmployerTop from '../../../components/clients/employerTop';
import JobsHot from '../../../components/clients/jobsHot';
import EmailForm from '../../../components/clients/emailForm';
import JobsOccupation from '../../../components/clients/jobsOccupation';
import CareerKey from '../../../components/clients/careerKey';
import TalentNetwork from '../../../components/clients/talentNetwork';



function Home() {
  const [listEmployers, setListEmployers] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const recordEmployers = await getListEmployers();

      if (recordEmployers.code === 200) {

        setListEmployers(decData(recordEmployers.data));
      }

    }
    fetchApi()
  }, [])

  return (
    <>
      <div className="home">
        <SliderBanner images={[imageSlider]} />
        <EmployerTop listEmployers={listEmployers} />
        <hr></hr>
        <JobsHot />
        <EmailForm />
        <hr></hr>
        <JobsOccupation />
        <hr></hr>
        <CareerKey />
        <TalentNetwork />
      </div>

    </>
  );
}
export default Home;
