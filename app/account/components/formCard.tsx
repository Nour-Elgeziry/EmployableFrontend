import { useState } from "react";

import EmailInput from "./emailInput";
import PasswordInput, { PasswordType } from "./passwordInput";

import {
  validateEmailAndConfirmPassword,
  ValidationResult,
  ValidationError,
} from "../utils/inputValidation";
import { registerUser } from "../utils/routes";

export enum CardType {
  SIGN_IN = "signIn",
  SIGN_UP = "signUp",
}

export interface UserInput {
  email: string;
  password: string;
}

const FormCard = (props: { type: CardType }) => {
  const [isUserInputValid, setIsUserInputValid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const submit = (event: any) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword?.value;

    if (props.type === CardType.SIGN_UP) {
      // validate user input
      const validationResult = validateEmailAndConfirmPassword(
        email,
        password,
        confirmPassword
      );

      // set states to view/hide error messages
      setIsUserInputValid({
        email: validationResult.error.includes(ValidationError.EMAIL),
        password: validationResult.error.includes(ValidationError.PASSWORD),
        confirmPassword: validationResult.error.includes(
          ValidationError.CONFIRM_PASSWORD
        ),
      });


      if (validationResult.isValid) {
        // submit form
        const userInput: UserInput = {
          email: event.target.email.value,
          password: event.target.password.value,
        };
        registerUser(userInput).then((res) => {
          if (!res.ok) {
            if (res.status === 409) {
              console.log("email is already in use");
            }
          }
        });
      }
    }
  };

  return (
    <form
      className="flex justify-center items-center h-screen"
      onSubmit={submit}
    >
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            {props.type === CardType.SIGN_IN ? "Sign In" : "Sign Up"}
          </h2>

          <EmailInput isInvalid={isUserInputValid.email} />

          <PasswordInput
            type={PasswordType.PASSWORD}
            isInvalid={isUserInputValid.password}
          />

          {props.type === CardType.SIGN_UP && (
            <PasswordInput
              type={PasswordType.CONFIRM_PASSWORD}
              isInvalid={isUserInputValid.confirmPassword}
            />
          )}

          <div className="card-actions justify-end">
            <button className="btn btn-primary" type="submit">
              {props.type === CardType.SIGN_IN ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormCard;
