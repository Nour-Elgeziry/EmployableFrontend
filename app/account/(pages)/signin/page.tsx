"use client";

import RegistrationFormCard from "../../components/registrationFormCard";
import { CardType } from "../../components/registrationFormCard";

const SignIn = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <RegistrationFormCard type={CardType.SIGN_IN} />
    </div>
  );
};

export default SignIn;
