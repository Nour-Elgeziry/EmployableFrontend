"use client";

import RegistrationFormCard from "../components/registrationFormCard";
import { CardType } from "../components/registrationFormCard";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <RegistrationFormCard type={CardType.SIGN_UP} />
    </div>
  );
};

export default SignUp;
