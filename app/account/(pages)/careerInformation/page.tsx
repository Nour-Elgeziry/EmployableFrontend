"use client";
import JobSeekerInformationForm from "../../components/jobSeekerInformation";
import { CardType } from "../../components/jobSeekerInformation";

const CareerInformation = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <JobSeekerInformationForm type={CardType.CAREER} />
    </div>
  );
};

export default CareerInformation;
