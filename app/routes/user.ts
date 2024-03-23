import {
  JobSeekerCareerInfo,
  JobSeekerPersonalInfo,
} from "../account/components/jobSeekerInformation";

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
