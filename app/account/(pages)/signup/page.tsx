"use client";

import AuthorizationFormCard from "../../components/authorizationForm";
import { CardType } from "../../components/authorizationForm";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthorizationFormCard type={CardType.SIGN_UP} />
    </div>
  );
};

export default SignUp;
