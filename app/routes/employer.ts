import {
  EmployeeRegistrationUserInput,
  EmployerRegistrationUserInput,
} from "../account/types";

export function signInEmployer(userInput: EmployeeRegistrationUserInput) {
  return fetch("http://localhost:8080/employer/signIn", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}
export function signUpEmployer(userInput: EmployerRegistrationUserInput) {
  return fetch("http://localhost:8080/employer/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}
export function addEmployeeToShortList(employeeId: string) {
  return fetch(`http://localhost:8080/employer/add-employee-shortlist`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ employeeId }),
  });
}

export function removeEmployeeFromShortList(employeeId: string) {
  return fetch(`http://localhost:8080/employer/remove-employee-shortlist`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ employeeId }),
  });
}
