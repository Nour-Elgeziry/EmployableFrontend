"use client";

import AuthorizationFormCard from "../../components/authorizationFormCard";
import { CardType } from "../../components/authorizationFormCard";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthorizationFormCard type={CardType.SIGN_UP} />
    </div>
  );
};

export default SignUp;
