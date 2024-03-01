import { useState } from "react";

const FilterBar = (props: {
  setFilter: (type: string, value: string | undefined) => void;
  education?: string;
  experience?: string;
  seniority?: string;
  title?: string;
}) => {
  const education = ["All", "High School", "Bachelor", "Master", "PhD"];
  const experience = ["All", "0-2", "2-5", "5-10", "10+"];
  const seniority = ["All", "Intern", "Entry", "Mid", "Senior"];
  const title = [
    "All",
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Business",
  ];

  return (
    <ul className="menu lg:menu-horizontal bg-base-200 rounded-box lg:mb-64">
      <li>
        <details>
          <summary>{props.education ?? "Education"}</summary>
          <ul>
            {education.map((educationItem) => (
              <li key={educationItem}>
                <a
                  onClick={() => {
                    if (educationItem === "All") {
                      props.setFilter("education", undefined);
                    } else props.setFilter("education", educationItem);
                  }}
                >
                  {educationItem}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>{props.title ?? "Title"}</summary>
          <ul>
            {title.map((title) => (
              <li key={title}>
                <a
                  onClick={() => {
                    if (title === "All") {
                      props.setFilter("title", undefined);
                    } else props.setFilter("title", title);
                  }}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>{props.experience ?? "Experience"}</summary>
          <ul>
            {experience.map((experience) => (
              <li key={experience}>
                <a
                  onClick={() => {
                    if (experience === "All") {
                      props.setFilter("experience", undefined);
                    } else props.setFilter("experience", experience);
                  }}
                >
                  {experience}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>{props.seniority ?? "Seniority"}</summary>
          <ul>
            {seniority.map((seniority) => (
              <li key={seniority}>
                <a
                  onClick={() => {
                    if (seniority === "All") {
                      props.setFilter("seniority", undefined);
                    } else props.setFilter("seniority", seniority);
                  }}
                >
                  {seniority}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </li>
    </ul>
  );
};

export default FilterBar;
