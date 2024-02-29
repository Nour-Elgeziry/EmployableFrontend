"use client";

import { useState, useEffect } from "react";
import EmployeeCard from "./components/employeeCard";
import FilterBar from "./components/filterBar";
import { Employee } from "./components/employeeCard";
import { getAllEmployees } from "../../../routes";

const EmployerDashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
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
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <div className="min-w-full">
        <FilterBar
          setFilter={(type: string, value: string) =>
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
        {employees.map((employee: Employee, index: number) => (
          <EmployeeCard key={index} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;
