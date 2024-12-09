import { AverageWorkHours, EmployeeWorkTime } from "@/components/EmployeeChart";
import { EmployeeContext } from "@/context/employee";
import { useContext } from "react";
import { LuLoader } from "react-icons/lu";

export default function Home() {
  const { employees, allTimeWork, loading } = useContext(EmployeeContext);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <LuLoader className="animate-spin h-12 w-12 text-blue-500" />
        </div>
      ) : (
        <>
          <EmployeeWorkTime allTimeWork={allTimeWork} />
          <AverageWorkHours employees={employees} />
        </>
      )}
    </div>
  );
}
