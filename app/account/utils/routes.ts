import { UserInput } from "../components/formCard";

export function loginUser(userInput: UserInput) {
  return fetch("http://localhost:8080/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}

export function registerUser(userInput: UserInput) {
  return fetch("http://localhost:8080/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}
