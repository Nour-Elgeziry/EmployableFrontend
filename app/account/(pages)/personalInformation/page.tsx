"use client";

import UserInformationFormCard from "../../components/userInformationCard";
import { CardType } from "../../components/userInformationCard";

const PersonalInformation = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <UserInformationFormCard type={CardType.PERSONAL} />
    </div>
  );
};

export default PersonalInformation;
