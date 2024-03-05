import { useState } from "react";

import {
  submitEmployeePersonalInformation,
  submitEmployeeCareerInformation,
} from "../../routes/employee";

import PersonalInformation from "./employeeInformationCards/personalInformation";
import CareerInformation from "./employeeInformationCards/careerInformation";

export enum CardType {
  PERSONAL = "personal",
  CAREER = "career",
}

export interface EmployeePersonalInfo {
  name: string;
  age: string;
  country: string;
}

export interface EmployeeCareerInfo {
  education: string;
  experience: string;
  seniority: string;
  title: string;
  cv: File;
}

const EmployeeInformationForm = (props: { type: CardType }) => {
  const [showToast, setShowToast] = useState({ show: false, message: "" });

  const submit = (event: any) => {
    event.preventDefault();
    // reset show toast
    setShowToast({ show: false, message: "" });

    if (props.type === CardType.PERSONAL) {
      const userInput: EmployeePersonalInfo = {
        name: event.target.name.value,
        age: event.target.age.value,
        country: event.target.country.value,
      };

      if (
        userInput.name === "" ||
        userInput.age === "" ||
        userInput.country === ""
      ) {
        setShowToast({ show: true, message: "Please fill in all fields" });
        return;
      }

      submitEmployeePersonalInformation(userInput).then((res) => {
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
      const userInput: EmployeeCareerInfo = {
        education: event.target.education.value,
        experience: event.target.experience.value,
        seniority: event.target.seniority.value,
        title: event.target.title.value,
        cv: file,
      };
      if (
        userInput.education === "" ||
        userInput.experience === "" ||
        userInput.seniority === "" ||
        userInput.title === "" ||
        userInput.cv === undefined
      ) {
        setShowToast({ show: true, message: "Please fill in all fields" });
        return;
      } else if (
        //check file size
        file.size >
        16 * 1024 * 1024
      ) {
        setShowToast({
          show: true,
          message: "File size must be less than 16MB",
        });
        return;
      }
      submitEmployeeCareerInformation(userInput).then((res) => {
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
      {showToast.show && (
        <div className="toast toast-center mb-10">
          <div className="alert alert-error">
            <span>{showToast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeInformationForm;
