import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EmployeeContext } from "@/context/employee";
import { LuLoader } from "react-icons/lu";
import { Typography, Grid, Avatar, Divider } from "@mui/material";
import { AuthContext } from "@/context/auth";
import { OPERATIONS } from "@/types/user";
import { Employee } from "@/types/employee";
import { Chart } from "react-google-charts";
import { months } from "@/data/months";

const workTimeOptions = {
  title: "Employee Work Time Statistics",
  hAxis: { title: "Months" },
  vAxis: { title: "Time (hours)" },
  legend: "none",
};

const averageWorkHoursOptions = {
  title: "Average Work Hours per Employee",
  hAxis: { title: "Employee" },
  vAxis: { title: "Average Hours" },
  legend: "none",
};

export default function EmployeeDetail() {
  const { id } = useParams<{ id: string }>();
  const { employees, loading } = useContext(EmployeeContext);
  const { isAuthorizedTo } = useContext(AuthContext);

  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const foundEmployee = employees.find(
      (_, index) => index + 1 === parseInt(id!)
    );
    setEmployee(foundEmployee || null);
  }, [id, employees]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LuLoader className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  if (!employee) {
    return (
      <Typography variant="h6" color="error">
        Employee not found
      </Typography>
    );
  }

  const authStatus = {
    read: isAuthorizedTo(OPERATIONS.READ),
  };

  if (!authStatus.read) {
    return (
      <Typography variant="h6" color="error">
        You do not have permission to view this employee
      </Typography>
    );
  }

  const workTimeData = [
    ["Month", "Work Hours"],
    ...months.map((month) => [month, employee.workTime[month] || 0]),
  ];

  const averageWorkHoursData = [
    ["Employee", "Average Work Hours"],
    [
      employee.name,
      Object.values(employee.workTime).reduce((sum, hours) => sum + hours, 0) /
        months.length,
    ],
  ];

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Employee Details
      </Typography>

      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={4}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            alt={employee.name}
            src={employee.pictureUrl}
            sx={{ width: 120, height: 120 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" component="h2">
            {employee.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {employee.jobTitle}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {employee.department}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">Email: {employee.email}</Typography>
          <Typography variant="body1">Phone: {employee.phone}</Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Address
      </Typography>
      <Typography variant="body1">
        {employee.address.street}, {employee.address.city},{" "}
        {employee.address.state} {employee.address.zipCode}
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Work Time
      </Typography>
      <div className="my-8 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Employee Work Time Statistics
        </h2>
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={workTimeData}
          options={workTimeOptions}
        />
      </div>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Average Work Hours per Employee
      </Typography>
      <div className="my-8 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Average Work Hours per Employee
        </h2>
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={averageWorkHoursData}
          options={averageWorkHoursOptions}
        />
      </div>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Hire Date
      </Typography>
      <Typography variant="body1">{employee.hireDate}</Typography>
    </div>
  );
}
