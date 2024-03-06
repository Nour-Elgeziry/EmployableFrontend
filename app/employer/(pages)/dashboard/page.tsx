"use client";

import { getAllEmployees } from "@/app/routes/employee";
import { useState, useEffect } from "react";
import EmployeeCard, { Employee } from "../../components/employeeCard";
import FilterBar from "../../components/filterBar";
import { getEmployeeShortList } from "@/app/routes/employer";

const EmployerDashboard = (props: { user: any }) => {
  const [shortList, setShortList] = useState<any>();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [filters, setFilters] = useState({
    education: undefined,
    title: undefined,
    experience: undefined,
    seniority: undefined,
  });

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.href = "/account/signin";
    }
    const fetchData = async () => {
      try {
        const allEmployees = await getAllEmployees();
        if (!allEmployees.ok) {
          throw new Error("Failed to fetch employees");
        }
        const employeesData: Employee[] = await allEmployees.json();

        setEmployees(employeesData);
        setFilteredEmployees(employeesData);

        const shortList = await getEmployeeShortList();

        if (!shortList.ok) {
          throw new Error("Failed to fetch shortlist");
        }
        const shortListData: any = await shortList.json();
        setShortList(shortListData.employeeShortList);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
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

  const onUpdateShortList = (updatedShortList: Employee[]) => {
    setShortList(updatedShortList);
  };

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
            isShortListed={
              shortList?.find((emp: Employee) => emp._id === employee._id)
                ? true
                : false
            }
            onUpdateShortList={onUpdateShortList}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;
