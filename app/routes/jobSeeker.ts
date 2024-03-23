import {
  JobSeekerCareerInfo,
  JobSeekerPersonalInfo,
} from "../account/components/jobSeekerInformation";
import { JobSeekerRegistrationUserInput } from "../account/types";

export function getAllJobSeekers() {
  return fetch("http://localhost:8080/jobSeeker/get-all", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function signInJobSeeker(userInput: JobSeekerRegistrationUserInput) {
  return fetch("http://localhost:8080/jobSeeker/signIn", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}

export function signUpJobSeeker(userInput: JobSeekerRegistrationUserInput) {
  return fetch("http://localhost:8080/jobSeeker/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}

export function submitJobSeekerPersonalInformation(
  userInput: JobSeekerPersonalInfo
) {
  return fetch("http://localhost:8080/jobSeeker/personal-info", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
}

export function submitJobSeekerCareerInformation(userInput: JobSeekerCareerInfo) {
  const formData = new FormData();
  formData.append("education", userInput.education);
  formData.append("experience", userInput.experience);
  formData.append("seniority", userInput.seniority);
  formData.append("title", userInput.title);
  formData.append("cv", userInput.cv);

  return fetch("http://localhost:8080/jobSeeker/career-info", {
    method: "POST",
    credentials: "include",
    headers: {},
    body: formData,
  });
}
