import { RegistrationUserInput } from "../components/registrationFormCard";
import { InformationUserInput } from "../components/userInformationCard";

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
