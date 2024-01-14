"use client";

import FormCard from "../components/formCard";
import { CardType } from "../components/formCard";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <FormCard type={CardType.SIGN_UP} />
    </div>
  );
};

export default SignUp;
