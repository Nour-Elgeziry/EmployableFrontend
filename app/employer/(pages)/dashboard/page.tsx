"use client";

import { getAllEmployees } from "@/app/routes/employee";
import { useState, useEffect } from "react";
import EmployeeCard, { Employee } from "../../components/employeeCard";
import FilterBar from "../../components/filterBar";



const EmployerDashboard = (props: { user: any }) => {
  const [user, setUser] = useState<any>();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [filters, setFilters] = useState({
    education: undefined,
    title: undefined,
    experience: undefined,
    seniority: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllEmployees();
        if (!res.ok) {
          throw new Error("Failed to fetch employees");
        }
        const employeesData: Employee[] = await res.json();
        setEmployees(employeesData);
        setFilteredEmployees(employeesData); // Initialize filtered list with all employees
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();

    if (!localStorage.getItem("user")) {
      window.location.href = "/account/signin";
    }
    const user = JSON.parse(localStorage.getItem("user")!);
    setUser(user);
  }, []);

  // Apply filters incrementally
  useEffect(() => {
    let filteredData = employees;

    if (filters.education) {
      filteredData = filteredData.filter(
        (employee) => employee.education === filters.education
      );
    }

    if (filters.title) {
      filteredData = filteredData.filter(
        (employee) => employee.title === filters.title
      );
    }

    if (filters.experience) {
      filteredData = filteredData.filter(
        (employee) => employee.experience === filters.experience
      );
    }

    if (filters.seniority) {
      filteredData = filteredData.filter(
        (employee) => employee.seniority === filters.seniority
      );
    }

    setFilteredEmployees(filteredData);
  }, [employees, filters]);

  return (
    <div>
      <div className="min-w-full flex justify-center mt-16 sticky top-4 z-10">
        <FilterBar
          setFilter={(type: string, value: string | undefined) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              [type]: value,
            }))
          }
          education={filters.education}
          title={filters.title}
          experience={filters.experience}
          seniority={filters.seniority}
        />
      </div>

      <div className="flex flex-col items-center">
        {filteredEmployees.map((employee: Employee, index: number) => (
          <EmployeeCard
            key={index}
            employee={employee}
            isShortListed={user.employeeShortList?.includes(employee._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;
