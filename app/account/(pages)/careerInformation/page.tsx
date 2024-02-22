"use client";
import EmployeeInformationForm from "../../components/employeeInformation";
import { CardType } from "../../components/employeeInformation";

const CareerInformation = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <EmployeeInformationForm type={CardType.CAREER} />
    </div>
  );
};

export default CareerInformation;
