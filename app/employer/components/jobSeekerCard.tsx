import {
  addJobSeekerToShortList,
  removeJobSeekerFromShortList,
} from "@/app/routes/employer";
import { useEffect, useState } from "react";

export interface JobSeeker {
  _id: string;
  name: string;
  age: number;
  title: string;
  education: string;
  experience: string;
  seniority: string;
}

interface toastType {
  show: boolean;
  type: "success" | "error";
  message: string;
}

const JobSeekerCard = (props: {
  jobSeeker: JobSeeker;
  isShortListed: boolean;
  onUpdateShortList: (updatedShortList: JobSeeker[]) => void;
}) => {
  const [showToast, setShowToast] = useState<toastType>({
    show: false,
    type: "error",
    message: "",
  });
  // Automatically close toast
  useEffect(() => {
    if (showToast.show) {
      const timeoutId = setTimeout(() => {
        setShowToast((prevState) => ({
          ...prevState,
          show: false,
        }));
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [showToast.show]);

  const handleButtonClick = (event: any) => {
    event.preventDefault();

    const clickedButton = event.nativeEvent.submitter?.getAttribute("name");

    if (clickedButton === "shortlist") {
      // Handle shortlist button click
      const jobSeekerId = props.jobSeeker._id;
      if (props.isShortListed) {
        // Remove from shortlist
        removeJobSeekerFromShortList(jobSeekerId).then(async (res) => {
          if (!res.ok) {
            setShowToast({
              show: true,
              type: "error",
              message: "Failed to remove job Seeker from shortlist",
            });
            console.log("Failed to remove job Seeker from shortlist");
          } else {
            // get updated shortlist from server response
            const updatedShortList = await res.json();

            setShowToast({
              show: true,
              type: "success",
              message: "Job seeker removed from shortlist",
            });
            props.onUpdateShortList(updatedShortList);
          }
        });
      } else {
        // Add to shortlist
        addJobSeekerToShortList(jobSeekerId).then(async (res) => {
          if (!res.ok) {
            setShowToast({
              show: true,
              type: "error",
              message: "Failed to add job seeker to shortlist",
            });
            console.log("Failed to add job seeker to shortlist");
          } else {
            const updatedShortList = await res.json();

            props.onUpdateShortList(updatedShortList);

            setShowToast({
              show: true,
              type: "success",
              message: "Job seeker added to shortlist",
            });

            console.log("Job seeker added to shortlist");
          }
        });
      }
    } else if (clickedButton === "contact") {
      // Handle contact button click
      console.log("Contact button clicked");
    }
  };

  return (
    <form onSubmit={handleButtonClick}>
      <div className="card w-96 bg-base-100 shadow-xl m-4 flex flex-col">
        <div className="card-body flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title mb-0">{`${props.jobSeeker.name} (${props.jobSeeker.age})`}</h2>
            <button
              name="shortlist"
              type="submit"
              className={`btn ${
                props.isShortListed
                  ? "bg-red-500 hover:bg-red-600  dark:bg-red-800 dark:hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600 dark:bg-green-800 dark:hover:bg-green-600"
              } btn-sm`}
            >
              {props.isShortListed ? (
                <>
                  <i className="fas fa-trash-alt"></i> Remove
                </>
              ) : (
                <>
                  <i className="fas fa-plus"></i> Add
                </>
              )}
            </button>
          </div>
          <p className="text-sm text-gray-400 -mt-2">{props.jobSeeker.title}</p>
          <p>Education: {props.jobSeeker.education}</p>
          <p>Experience: {props.jobSeeker.experience}</p>
          <p>Seniority: {props.jobSeeker.seniority}</p>
          <div className="card-actions justify-end">
            <button name="contact" type="submit" className="btn btn-primary">
              Contact
            </button>
          </div>
        </div>
      </div>
      {showToast.show && (
        <div className="toast toast-end mb-10 z-20">
          <div className={`alert alert-${showToast.type}`}>
            <span>{showToast.message}</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default JobSeekerCard;
