"use client";

import EmployeeInformationForm from "../../components/employeeInformation";
import { CardType } from "../../components/employeeInformation";

const PersonalInformation = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <EmployeeInformationForm type={CardType.PERSONAL} />
    </div>
  );
};

export default PersonalInformation;
