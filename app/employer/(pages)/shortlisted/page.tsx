"use client";
import { useState, useEffect } from "react";
import JobSeekerCard, { JobSeeker } from "../../components/jobSeekerCard";
import { getJobSeekerShortList } from "@/app/routes/employer";
import FilterBar from "../../components/filterBar";

const Shortlist = () => {
  const [shortList, setShortList] = useState<JobSeeker[]>([]);
  const [filteredShortList, setFilteredShortList] = useState<JobSeeker[]>([]);

  // Function to fetch shortlist data
  const fetchShortList = async () => {
    try {
      const res = await getJobSeekerShortList();
      if (!res.ok) {
        console.log(res);
        throw new Error("Failed to fetch shortlist");
      }

      const employerData: any = await res.json();
      const shortList = employerData.jobSeekerShortList;
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


  const onUpdateShortList = (updatedShortList: JobSeeker[]) => {
    setShortList(updatedShortList);
    setFilteredShortList(updatedShortList);
    setFilters({
      education: undefined,
      title: undefined,
      experience: undefined,
      seniority: undefined,
    });
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
        (jobSeeker) => jobSeeker.education === filters.education
      );
    }

    if (filters.title) {
      filteredData = filteredData.filter(
        (jobSeeker) => jobSeeker.title === filters.title
      );
    }

    if (filters.experience) {
      filteredData = filteredData.filter(
        (jobSeeker) => jobSeeker.experience === filters.experience
      );
    }

    if (filters.seniority) {
      filteredData = filteredData.filter(
        (jobSeeker) => jobSeeker.seniority === filters.seniority
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
        {filteredShortList?.map((jobSeeker: any, index: number) => (
          <JobSeekerCard
            key={index}
            jobSeeker={jobSeeker}
            isShortListed={true}
            onUpdateShortList={onUpdateShortList}
          />
        ))}
      </div>
    </div>
  );
};

export default Shortlist;
