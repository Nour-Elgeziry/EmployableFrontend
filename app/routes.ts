import {
  EmployeeCareerInfo,
  EmployeePersonalInfo,
} from "./account/components/employeeInformation";
import { EmployeeRegistrationUserInput, EmployerRegistrationUserInput } from "./account/types";

export function getAllEmployees() {
  return fetch("http://localhost:8080/employee/get-all", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function signInEmployee(userInput: EmployeeRegistrationUserInput) {
  return fetch("http://localhost:8080/employee/signIn", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}

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

export function signUpEmployee(userInput: EmployeeRegistrationUserInput) {
  return fetch("http://localhost:8080/employee/signUp", {
    method: "POST",
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

export function logoutUser() {
  return fetch("http://localhost:8080/user/logout", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function checkUserLoggedIn() {
  return fetch("http://localhost:8080/user/check-user-logged-in", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function submitEmployeePersonalInformation(
  userInput: EmployeePersonalInfo
) {
  return fetch("http://localhost:8080/employee/personal-info", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}

export function submitEmployeeCareerInformation(userInput: EmployeeCareerInfo) {
  const formData = new FormData();
  formData.append("education", userInput.education);
  formData.append("experience", userInput.experience);
  formData.append("seniority", userInput.seniority);
  formData.append("title", userInput.title);
  formData.append("cv", userInput.cv);

  return fetch("http://localhost:8080/employee/career-info", {
    method: "POST",
    credentials: "include",
    headers: {},
    body: formData,
  });
}
