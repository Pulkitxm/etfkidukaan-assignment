import { useContext } from "react";
import { EmployeeContext } from "@/context/employee";
import { LuLoader } from "react-icons/lu";
import { EmployeeWorkTime, AverageWorkHours } from "@/components/EmployeeChart";

export default function Home() {
  const { employees, allTimeWork, loading } = useContext(EmployeeContext);

  return (
    <div className="p-6">
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
