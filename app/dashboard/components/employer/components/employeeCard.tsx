import {
  addEmployeeToShortList,
  removeEmployeeFromShortList,
} from "@/app/routes/employer";
import { useEffect, useState } from "react";

export interface Employee {
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

const EmployeeCard = (props: {
  employee: Employee;
  isShortListed: boolean;
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

  const [isShortListed, setIsShortListed] = useState(props.isShortListed);
  const handleButtonClick = (event: any) => {
    event.preventDefault();

    const clickedButton = event.nativeEvent.submitter?.getAttribute("name");
    console.log("clickedButton", clickedButton);

    if (clickedButton === "shortlist") {
      // Handle shortlist button click
      const employeeId = props.employee._id;
      if (isShortListed) {
        // Remove from shortlist
        removeEmployeeFromShortList(employeeId).then((res) => {
          if (!res.ok) {
            setShowToast({
              show: true,
              type: "error",
              message: "Failed to remove employee from shortlist",
            });
            console.log("Failed to remove employee from shortlist");
          } else {
            // adjust local storage user shortlist
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            user.employeeShortList = user.employeeShortList.filter(
              (employeeId: any) => employeeId !== employeeId
            );
            localStorage.setItem("user", JSON.stringify(user));

            setIsShortListed(false);

            setShowToast({
              show: true,
              type: "success",
              message: "Employee removed from shortlist",
            });

            console.log("Employee removed from shortlist");
          }
        });
      } else {
        // Add to shortlist
        addEmployeeToShortList(employeeId).then((res) => {
          if (!res.ok) {
            setShowToast({
              show: true,
              type: "error",
              message: "Failed to add employee to shortlist",
            });
            console.log("Failed to add employee to shortlist");
          } else {
            // adjust local storage user shortlist
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            user.employeeShortList.push(employeeId);
            localStorage.setItem("user", JSON.stringify(user));

            setIsShortListed(true);

            setShowToast({
              show: true,
              type: "success",
              message: "Employee added to shortlist",
            });
            console.log("Employee added to shortlist");
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
            <h2 className="card-title mb-0">{`${props.employee.name} (${props.employee.age})`}</h2>
            <button
              name="shortlist"
              type="submit"
              className={`btn ${
                isShortListed
                  ? "bg-red-800 hover:bg-red-600"
                  : "bg-green-800 hover:bg-green-600"
              } btn-sm`}
            >
              {isShortListed ? (
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
          <p className="text-sm text-gray-400 -mt-2">{props.employee.title}</p>
          <p>Education: {props.employee.education}</p>
          <p>Experience: {props.employee.experience}</p>
          <p>Seniority: {props.employee.seniority}</p>
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

export default EmployeeCard;
