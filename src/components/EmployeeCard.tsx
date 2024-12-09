import { Employee } from "@/data/employees";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <div className="employee-card">
      <img
        src={employee.pictureUrl}
        alt={`${employee.name}'s profile`}
        className="profile-img"
      />
      <h3>{employee.name}</h3>
      <p>
        {employee.jobTitle} - {employee.department}
      </p>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Hire Date: {new Date(employee.hireDate).toLocaleDateString()}</p>

      <h4>Address</h4>
      <p>{employee.address.street}</p>
      <p>
        {employee.address.city}, {employee.address.state}{" "}
        {employee.address.zipCode}
      </p>
    </div>
  );
};

export default EmployeeCard;
