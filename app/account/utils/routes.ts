import { RegistrationUserInput } from "../components/registrationFormCard";
import {
  CareerUserInput,
  InformationUserInput,
} from "../components/userInformationCard";

export function loginUser(userInput: RegistrationUserInput) {
  return fetch("http://localhost:8080/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}

export function registerUser(userInput: RegistrationUserInput) {
  return fetch("http://localhost:8080/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}

export function submitUserInformation(userInput: InformationUserInput) {
  return fetch("http://localhost:8080/user/personal-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(userInput),
  });
}

export function submitCareerInformation(userInput: CareerUserInput) {
  const formData = new FormData();
  formData.append("education", userInput.education);
  formData.append("experience", userInput.experience);
  formData.append("seniority", userInput.seniority);
  formData.append("profession", userInput.profession);
  formData.append("cv", userInput.cv);

  return fetch("http://localhost:8080/user/career-info", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });
}
