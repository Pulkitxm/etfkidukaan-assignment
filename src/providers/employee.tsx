import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { EmployeeContext } from "@/context/employee";
import { Employee, validateEmployee } from "@/types/employee";
import axios from "axios";
import { months } from "@/data/months";
import { delay } from "@/util";
import { AuthContext } from "@/context/auth";

const localStorgaeOps = {
  set: (value: Employee[]) => {
    localStorage.setItem("employees", JSON.stringify(value));
  },
  get: () => {
    const data = localStorage.getItem("employees");
    const es = data ? JSON.parse(data) : [];
    const es2: Employee[] = [];

    for (const e of es) {
      const val = validateEmployee.safeParse(e);
      if (val.success) es2.push(val.data);
    }

    return es2;
  },
};

export const EmployeeProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  const allTimeWork: Record<string, number> = useMemo(() => {
    const allTimeWork: { [key: string]: number } = {};
    for (const month of months) {
      const totalWorkTime = employees.reduce(
        (prevEmployeeTime, employee) =>
          prevEmployeeTime + employee.workTime[month],
        0
      );
      allTimeWork[month] = totalWorkTime;
    }
    return allTimeWork;
  }, [employees]);

  const initEmployees = useCallback(async () => {
    setLoading(true);
    await delay(1000);
    let es: Employee[] = [];
    const localEs = localStorgaeOps.get();
    if (localEs.length > 0) {
      setLoading(false);
      es = localEs;
      return localEs;
    } else {
      const res = await axios.get("/employees.json");
      es = [];
      for (const e of res.data) {
        const val = validateEmployee.safeParse(e);
        if (val.success) es.push(val.data);
      }
      localStorgaeOps.set(es);
    }
    setLoading(false);
    return es;
  }, []);

  const deleteEmployee = useCallback(
    async (id: number) => {
      const newEmployees = employees.filter((_, index) => index !== id);
      localStorgaeOps.set(newEmployees);
      setEmployees(newEmployees);
    },
    [employees]
  );

  const updateEmployee = useCallback(
    async (index: number, employee: Employee) => {
      const newEmployees = employees.map((e, i) =>
        i === index ? employee : e
      );
      localStorgaeOps.set(newEmployees);
      setEmployees(newEmployees);
    },
    [employees]
  );

  const getMonthWiseWorkTime = useCallback(() => {
    const monthWiseWorkTime: Record<string, number> = {};
    for (const month of months) {
      const totalWorkTime = employees.reduce(
        (prevEmployeeTime, employee) =>
          prevEmployeeTime + employee.workTime[month],
        0
      );
      monthWiseWorkTime[month] = totalWorkTime;
    }
    return { months, allTimeWork: monthWiseWorkTime };
  }, [employees]);

  useEffect(() => {
    if (isLoggedIn) {
      initEmployees().then((res) => {
        setEmployees(res);
      });
    }
  }, [isLoggedIn, initEmployees]);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        getMonthWiseWorkTime,
        allTimeWork,
        loading,
        deleteEmployee,
        updateEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
