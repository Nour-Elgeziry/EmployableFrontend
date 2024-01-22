import { useState } from "react";

import {
  submitUserInformation,
  submitCareerInformation,
} from "../utils/routes";

import PersonalInformation from "./userInformationBody/personalInformation";
import CareerInformation from "./userInformationBody/careerInformation";

export enum CardType {
  PERSONAL = "personal",
  CAREER = "career",
}

export interface InformationUserInput {
  name: string;
  age: string;
  country: string;
}

export interface CareerUserInput {
  education: string;
  experience: string;
  seniority: string;
  profession: string;
  cv: File;
}

const UserInformationFormCard = (props: { type: CardType }) => {
  const [showToast, setShowToast] = useState(false);

  const submit = (event: any) => {
    event.preventDefault();
    // reset show toast
    setShowToast(false);

    if (props.type === CardType.PERSONAL) {
      const userInput: InformationUserInput = {
        name: event.target.name.value,
        age: event.target.age.value,
        country: event.target.country.value,
      };

      if (
        userInput.name === "" ||
        userInput.age === "" ||
        userInput.country === ""
      ) {
        setShowToast(true);
        return;
      }

      submitUserInformation(userInput).then((res) => {
        if (!res.ok) {
          console.log("error");
        } else {
          console.log("success");
          // redirect to career information page
          window.location.href = "/account/careerInformation";
        }
      });
    } else {
      const file = event.target.cv.files[0];
      const userInput: CareerUserInput = {
        education: event.target.education.value,
        experience: event.target.experience.value,
        seniority: event.target.seniority.value,
        profession: event.target.profession.value,
        cv: file,
      };
      if (
        userInput.education === "" ||
        userInput.experience === "" ||
        userInput.seniority === "" ||
        userInput.profession === "" ||
        userInput.cv === undefined
      ) {
        setShowToast(true);
        return;
      }

      submitCareerInformation(userInput).then((res) => {
        if (!res.ok) {
          console.log("error");
        } else {
          console.log("success");
          // redirect to home
          window.location.href = "/";
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
              {`${
                props.type === CardType.PERSONAL ? "Personal" : "Career"
              } Information`}
            </h2>

            {props.type === CardType.PERSONAL ? (
              <PersonalInformation />
            ) : (
              <CareerInformation />
            )}

            <div className="card-actions justify-end">
              <button className="btn btn-primary mt-5" type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      {showToast && (
        <div className="toast toast-center mb-10">
          <div className="alert alert-error">
            <span>Please complete all sections</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInformationFormCard;
