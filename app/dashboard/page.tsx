"use client";

import EmployerDashboard from "./components/employer/employerDashboard";
import EmployeeDashboard from "./components/employee/employeeDashboard";

const Dashboard = () => {
  if (!localStorage.getItem("user")) {
    window.location.href = "/account/signin";
  }
  const user = JSON.parse(localStorage.getItem("user")!);
  return (
    <div>
      {user.role === "employer" && <EmployerDashboard />}

      {user.role === "employee" && <EmployeeDashboard />}
    </div>
  );
};

export default Dashboard;
