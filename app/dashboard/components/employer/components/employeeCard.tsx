export interface Employee {
  name: string;
  age: number;
  title: string;
  education: string;
  experience: string;
  seniority: string;
}

const EmployeeCard = (props: { employee: Employee }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl m-4">
      <div className="card-body">
        <h2 className="card-title mb-0">{`${props.employee.name} (${props.employee.age})`}</h2>
        <p className="text-sm text-gray-400 -mt-2">
          {props.employee.title}
        </p>
        <p>Education: {props.employee.education}</p>
        <p>Experience: {props.employee.experience}</p>
        <p>Seniority: {props.employee.seniority}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
