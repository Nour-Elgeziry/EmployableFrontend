import { useState } from "react";

import { submitUserInformation } from "../utils/routes";

import PersonalInformation from "./userInformationBody/personalInformation";
import CareerInformation from "./userInformationBody/careerInformation";

export enum CardType {
  PERSONAL = "personal",
  CAREER = "career",
}

export enum TextInputField {
  NAME = "name",
  AGE = "age",
}

export interface InformationUserInput {
  name: string;
  age: string;
  country: string;
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
      }

      submitUserInformation(userInput).then((res) => {
        if (!res.ok) {
          console.log("error");
        } else {
          console.log("success");
          // redirect to home page
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
