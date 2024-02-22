"use client";

import AuthorizationFormCard from "../../components/authorizationForm";
import { CardType } from "../../components/authorizationForm";

const SignIn = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthorizationFormCard type={CardType.SIGN_IN} />
    </div>
  );
};

export default SignIn;
