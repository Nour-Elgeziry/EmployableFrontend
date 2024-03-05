"use client";

import EmployerDashboard from "./components/employer/employerDashboard";
import EmployeeDashboard from "./components/employee/employeeDashboard";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.href = "/account/signin";
    }
    const user = JSON.parse(localStorage.getItem("user")!);
    setUser(user);
  }, []);

  return (
    <div>
      {user?.role === "employer" && <EmployerDashboard user={user} />}

      {user?.role === "employee" && <EmployeeDashboard />}
    </div>
  );
};

export default Dashboard;
