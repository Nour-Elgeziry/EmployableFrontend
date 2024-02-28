import {
  EmployeeRegistrationUserInput,
  EmployerRegistrationUserInput,
} from "../components/authorizationForm";
import {
  EmployeeCareerInfo,
  EmployeePersonalInfo,
} from "../components/employeeInformation";

export function loginEmployee(userInput: EmployeeRegistrationUserInput) {
  return fetch("http://localhost:8080/employee/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}

export function loginEmployer(userInput: EmployeeRegistrationUserInput) {
  return fetch("http://localhost:8080/employer/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}

export function registerEmployee(userInput: EmployeeRegistrationUserInput) {
  return fetch("http://localhost:8080/employee/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}

export function registerEmployer(userInput: EmployerRegistrationUserInput) {
  return fetch("http://localhost:8080/employer/register", {
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
  formData.append("profession", userInput.profession);
  formData.append("cv", userInput.cv);

  return fetch("http://localhost:8080/employee/career-info", {
    method: "POST",
    credentials: "include",
    headers: {},
    body: formData,
  });
}
