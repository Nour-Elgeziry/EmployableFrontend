import { useState } from "react";
import { useRouter } from "next/navigation";

import EmailInput from "./inputComponents/emailInput";
import PasswordInput, { PasswordType } from "./inputComponents/passwordInput";

import { validateUserInput, ValidationError } from "../utils/inputValidation";

import { signUpEmployee, signInEmployee } from "../../routes/employee";

import { signInEmployer, signUpEmployer } from "../../routes/employer";

import TextInput, { TextInputField } from "./inputComponents/textInput";
import WebsiteInput from "./inputComponents/websiteInput";

import {
  CardType,
  EmployeeRegistrationUserInput,
  EmployerRegistrationUserInput,
  UserType,
} from "../types";

const AuthorizationFormCard = (props: { type: CardType }) => {
  const router = useRouter();

  const [userType, setUserType] = useState(UserType.EMPLOYEE);

  const [isUserInputValid, setIsUserInputValid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    website: false,
    name: false,
    company: false,
  });

  const [showErrorToast, setShowErrorToast] = useState(false);

  const submit = (event: any) => {
    event.preventDefault();

    // reset toast
    setShowErrorToast(false);

    const email = event.target.email.value.toLowerCase();
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword?.value;

    // additional values only used for employer registration
    const name = event.target.name?.value;
    const company = event.target.company?.value;
    const website = event.target.website?.value;

    // SignUp
    if (props.type === CardType.SIGN_UP) {
      // validate user input
      let validationResult;

      if (userType === UserType.EMPLOYER) {
        validationResult = validateUserInput(
          email,
          password,
          confirmPassword,
          name,
          company,
          website
        );
      } else {
        validationResult = validateUserInput(email, password, confirmPassword);
      }

      // set states to view/hide error messages
      setIsUserInputValid({
        email: validationResult.error.includes(ValidationError.EMAIL),
        password: validationResult.error.includes(ValidationError.PASSWORD),
        confirmPassword: validationResult.error.includes(
          ValidationError.CONFIRM_PASSWORD
        ),
        website: validationResult.error.includes(ValidationError.WEBSITE),
        name: validationResult.error.includes(ValidationError.NAME),
        company: validationResult.error.includes(ValidationError.COMPANY),
      });

      if (validationResult.isValid) {
        let userInput:
          | EmployerRegistrationUserInput
          | EmployeeRegistrationUserInput;

        if (userType === UserType.EMPLOYER) {
          userInput = {
            email: email,
            password: password,
            name: name,
            company: company,
            website: website,
          };
          signUpEmployer(userInput).then((res) => {
            if (!res.ok) {
              if (res.status === 409) {
                console.log("email is already in use");
                setShowErrorToast(true);
              }
            } else {
              // redirect to sign in page
              router.push("/account/signin");
            }
          });
        } else {
          userInput = {
            email: email,
            password: password,
          };

          signUpEmployee(userInput).then((res) => {
            if (!res.ok) {
              if (res.status === 409) {
                console.log("email is already in use");
                setShowErrorToast(true);
              }
            } else {
              // redirect to login page
              router.push("/account/signin");
            }
          });
        }
      }
    } else {
      // SignIn
      const userInput: EmployeeRegistrationUserInput = {
        email: email,
        password: password,
      };

      if (userType === UserType.EMPLOYER) {
        signInEmployer(userInput).then(async (res) => {
          if (!res.ok) {
            if (res.status === 401) {
              console.log("invalid credentials");
              setShowErrorToast(true);
            }
          } else {
            const response = await res.json();
            // store the user object in local storage
            const userObj = JSON.stringify(response);
            localStorage.setItem("user", userObj);

            router.push("/dashboard");
          }
        });
      } else {
        signInEmployee(userInput).then(async (res) => {
          if (!res.ok) {
            if (res.status === 401) {
              console.log("invalid credentials");
              setShowErrorToast(true);
            }
          } else {
            // redirect to correct page based on user information
            const response = await res.json();

            // store the user object in local storage
            const userObj = JSON.stringify(response);
            localStorage.setItem("user", userObj);

            switch (response.isPersonalInformationComplete) {
              case true:
                switch (response.isCareerInformationComplete) {
                  case true:
                    router.push("/dashboard");
                    break;
                  case false:
                    router.push("/account/careerInformation");
                    break;
                  default:
                    break;
                }
                break;
              case false:
                router.push("/account/personalInformation");
                break;
              default:
                break;
            }
          }
        });
      }
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

            <div>
              <span className="label-text">Employee</span>
              <input
                type="checkbox"
                className="toggle [--tglbg:grey] bg-gray-400 hover:bg-gray-700 border-gray-800 mx-6 mt-2"
                onChange={() => {
                  userType === UserType.EMPLOYEE
                    ? setUserType(UserType.EMPLOYER)
                    : setUserType(UserType.EMPLOYEE);
                }}
                checked={userType === UserType.EMPLOYER}
              />
              <span className="label-text">Employer</span>
            </div>

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

            {userType === UserType.EMPLOYER &&
              props.type === CardType.SIGN_UP && (
                <>
                  <TextInput
                    title={"What is your name?"}
                    type={TextInputField.NAME}
                    isInvalid={isUserInputValid.name}
                  />
                  <TextInput
                    title={"What is your company name?"}
                    type={TextInputField.COMPANY}
                    isInvalid={isUserInputValid.company}
                  />
                  <WebsiteInput isInvalid={isUserInputValid.website} />
                </>
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
      {showErrorToast && (
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

export default AuthorizationFormCard;
