import { useState } from "react";

import EmailInput from "../UIComponents/emailInput";
import PasswordInput, { PasswordType } from "../UIComponents/passwordInput";

import {
  validateEmailAndConfirmPassword,
  ValidationResult,
  ValidationError,
} from "../utils/inputValidation";
import { registerUser, loginUser } from "../utils/routes";

export enum CardType {
  SIGN_IN = "signIn",
  SIGN_UP = "signUp",
}

export interface RegistrationUserInput {
  email: string;
  password: string;
}

const RegistrationFormCard = (props: { type: CardType }) => {
  const [isUserInputValid, setIsUserInputValid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showToast, setShowToast] = useState(false);

  const submit = (event: any) => {
    event.preventDefault();

    // reset show toast
    setShowToast(false);

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
        const userInput: RegistrationUserInput = {
          email: event.target.email.value,
          password: event.target.password.value,
        };
        registerUser(userInput).then((res) => {
          if (!res.ok) {
            if (res.status === 409) {
              console.log("email is already in use");
              setShowToast(true);
            }
          } else {
            // redirect to login page
            window.location.href = "/account/login";
          }
        });
      }
    } else {
      // submit form
      const userInput: RegistrationUserInput = {
        email: event.target.email.value,
        password: event.target.password.value,
      };

      loginUser(userInput)
        .then(async (res) => {
          if (!res.ok) {
            if (res.status === 401) {
              console.log("invalid credentials");
              setShowToast(true);
            }
          } else {
            const jsonBody = await res.json();
            console.log(jsonBody);
            const token = jsonBody.user.token;
            // store token in local storage
            localStorage.setItem("token", token);
            // redirect to personal-info page
            window.location.href = "/account/personalInformation";
          }
        });
    }
  };

  return (
    <div>
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

            <div className="card-actions justify-start">
              <a
                className="link text-xs"
                href={
                  props.type === CardType.SIGN_IN
                    ? "/account/signup"
                    : "/account/signin"
                }
              >
                {props.type === CardType.SIGN_IN
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </a>
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-primary mt-5" type="submit">
                {props.type === CardType.SIGN_IN ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </form>
      {showToast && (
        <div className="toast toast-center mb-10">
          <div className="alert alert-error">
            <span>
              {props.type === CardType.SIGN_IN
                ? "Invalid Credentials"
                : "Email already in use"}
              .
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationFormCard;
