"use client";

import JobSeekerInformationForm from "../../components/jobSeekerInformation";
import { CardType } from "../../components/jobSeekerInformation";

const PersonalInformation = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <JobSeekerInformationForm type={CardType.PERSONAL} />
    </div>
  );
};

export default PersonalInformation;
