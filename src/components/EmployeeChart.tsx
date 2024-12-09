import { months } from "@/data/months";
import { Employee } from "@/types/employee";
import { Chart } from "react-google-charts";

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

export function EmployeeWorkTime({
  allTimeWork,
}: {
  allTimeWork: Record<string, number>;
}) {
  const workTimeData = [
    ["Month", "Work Hours"],
    ...months.map((month) => [month, allTimeWork[month]]),
  ];
  return (
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
  );
}

export function AverageWorkHours({
  employees,
}: {
  employees: Employee[];
}) {
  const averageWorkHoursData = [
    ["Employee", "Average Work Hours"],
    ...employees.map(
      (employee: { name: string; workTime: { [key: string]: number } }) => {
        const avgWorkTime =
          Object.values(employee.workTime).reduce(
            (sum: number, hours: number) => sum + hours,
            0
          ) / months.length;
        return [employee.name, avgWorkTime];
      }
    ),
  ];
  return (
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
  );
}
