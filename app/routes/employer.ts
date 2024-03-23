import {
  JobSeekerRegistrationUserInput,
  EmployerRegistrationUserInput,
} from "../account/types";

export function signInEmployer(userInput: JobSeekerRegistrationUserInput) {
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
export function addJobSeekerToShortList(jobSeekerId: string) {
  return fetch(`http://localhost:8080/employer/add-job-seeker-shortlist`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jobSeekerId }),
  });
}

export function removeJobSeekerFromShortList(jobSeekerId: string) {
  return fetch(`http://localhost:8080/employer/remove-job-seeker-shortlist`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jobSeekerId }),
  });
}
export function getJobSeekerShortList() {
  return fetch(`http://localhost:8080/employer/get-job-seeker-shortlist`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
