"use client";
import { useState, useEffect } from "react";
import EmployeeCard, { Employee } from "../../components/employeeCard";
import { getEmployeeShortList } from "@/app/routes/employer";
import FilterBar from "../../components/filterBar";

const Shortlist = () => {
  const [shortList, setShortList] = useState<Employee[]>([]);
  const [filteredShortList, setFilteredShortList] = useState<Employee[]>([]);

  // Function to fetch shortlist data
  const fetchShortList = async () => {
    try {
      const res = await getEmployeeShortList();
      if (!res.ok) {
        console.log(res);
        throw new Error("Failed to fetch shortlist");
      }

      const employerData: any = await res.json();
      const shortList = employerData.employeeShortList;
      setShortList(shortList);
      setFilteredShortList(shortList);
    } catch (error) {
      console.error("Error fetching shortlist:", error);
    }
  };

  useEffect(() => {
    // Fetch shortlist data when the component mounts
    fetchShortList();
  }, []);

  // Function to refetch shortlist data
  const handleRefetchShortList = () => {
    fetchShortList();
  };

  const [filters, setFilters] = useState({
    education: undefined,
    title: undefined,
    experience: undefined,
    seniority: undefined,
  });

  // Apply filters incrementally
  useEffect(() => {
    let filteredData = shortList;

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

    setFilteredShortList(filteredData);
  }, [shortList, filters]);

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
        {filteredShortList?.map((employee: any, index: number) => (
          <EmployeeCard
            key={index}
            employee={employee}
            isShortListed={true}
            onRefetchShortList={handleRefetchShortList} // Pass callback function
          />
        ))}
      </div>
    </div>
  );
};

export default Shortlist;
