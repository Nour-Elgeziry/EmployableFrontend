"use client";

import AuthorizationFormCard from "../../components/authorizationFormCard";
import { CardType } from "../../components/authorizationFormCard";

const SignIn = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthorizationFormCard type={CardType.SIGN_IN} />
    </div>
  );
};

export default SignIn;
