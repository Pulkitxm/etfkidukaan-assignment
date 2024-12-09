import { Employee } from "@/types/employee";
import { createContext } from "react";

export const EmployeeContext = createContext<{
  employees: Employee[];
  getMonthWiseWorkTime: () => {
    months: string[];
    allTimeWork: Record<string, number>;
  };
  allTimeWork: Record<string, number>;
  loading: boolean;
  deleteEmployee: (id: number) => void;
}>({
  employees: [],
  loading: false,
  getMonthWiseWorkTime: () => ({
    months: [],
    allTimeWork: {},
  }),
  allTimeWork: {},
  deleteEmployee: () => {},
});
