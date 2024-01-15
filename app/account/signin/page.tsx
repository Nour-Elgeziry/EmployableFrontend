"use client";

import FormCard from "../components/formCard";
import { CardType } from "../components/formCard";

const SignIn = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <FormCard type={CardType.SIGN_IN} />
    </div>
  );
};

export default SignIn;
