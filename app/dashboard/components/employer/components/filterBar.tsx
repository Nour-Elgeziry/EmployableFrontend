import { useState } from "react";

const FilterBar = (props: {
  setFilter: (type: string, value: string) => void;
  education?: string;
  experience?: string;
  seniority?: string;
  title?: string;
}) => {
  const education = ["High School", "Bachelor", "Masters", "PhD"];
  const experience = ["0-2", "2-5", "5-10", "10+"];
  const seniority = ["Intern", "Entry", "Mid", "Senior"];
  const title = [
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
                    props.setFilter("education", educationItem);
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
                    props.setFilter("title", title);
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
                    props.setFilter("experience", experience);
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
                    props.setFilter("seniority", seniority);
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
