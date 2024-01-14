import { UserInput } from "../components/formCard";

export function registerUser(userInput: UserInput) {
  return fetch("http://localhost:8080/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}
