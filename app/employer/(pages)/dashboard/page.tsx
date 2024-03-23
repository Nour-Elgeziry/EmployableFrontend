"use client";

import { getAllJobSeekers } from "@/app/routes/jobSeeker";
import { useState, useEffect } from "react";
import JobSeekerCard, { JobSeeker } from "../../components/jobSeekerCard";
import FilterBar from "../../components/filterBar";
import { getJobSeekerShortList } from "@/app/routes/employer";

const EmployerDashboard = (props: { user: any }) => {
  const [shortList, setShortList] = useState<any>();
  const [jobSeekers, setJobSeekers] = useState<JobSeeker[]>([]);
  const [filteredJobSeekers, setFilteredJobSeekers] = useState<JobSeeker[]>([]);
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
        const allJobSeekers = await getAllJobSeekers();
        if (!allJobSeekers.ok) {
          throw new Error("Failed to fetch job seekers");
        }
        const jobSeekersData: JobSeeker[] = await allJobSeekers.json();

        setJobSeekers(jobSeekersData);
        setFilteredJobSeekers(jobSeekersData);

        const shortList = await getJobSeekerShortList();

        if (!shortList.ok) {
          throw new Error("Failed to fetch shortlist");
        }
        const shortListData: any = await shortList.json();
        setShortList(shortListData.jobSeekerShortList);
      } catch (error) {
        console.error("Error fetching jobSeekers:", error);
      }
    };

    fetchData();
  }, []);

  // Apply filters incrementally
  useEffect(() => {
    let filteredData = jobSeekers;

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

    setFilteredJobSeekers(filteredData);
  }, [jobSeekers, filters]);

  const onUpdateShortList = (updatedShortList: JobSeeker[]) => {
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
        {filteredJobSeekers.map((jobSeeker: JobSeeker, index: number) => (
          <JobSeekerCard
            key={index}
            jobSeeker={jobSeeker}
            isShortListed={
              shortList?.find((emp: JobSeeker) => emp._id === jobSeeker._id)
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
