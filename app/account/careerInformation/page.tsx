"use client";
import checkLoginStatus from "@/app/middleware/checkLoginStatus";

import UserInformationFormCard from "../components/userInformationCard";
import { CardType } from "../components/userInformationCard";

const CareerInformation = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <UserInformationFormCard type={CardType.CAREER} />
    </div>
  );
};

export default checkLoginStatus(CareerInformation);
