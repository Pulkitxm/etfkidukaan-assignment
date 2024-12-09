import { AuthContext } from "@/context/auth";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import EmployeeList from "./EmployeeList";
import EmployeeDetail from "./EmployeeDetail";

const routes: {
  path: string;
  element?: JSX.Element;
  isProtected?: boolean;
  redirect?: string;
}[] = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    redirect: "/dashboard",
    isProtected: true,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Login />,
  },
  {
    path: "/employees",
    element: <EmployeeList />,
    isProtected: true,
  },
  {
    path: "/employees/:id",
    element: <EmployeeDetail />,
    isProtected: true,
  },
] as const;

export default function EtfRoutes() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route
            key={"Route-" + index}
            path={route.path}
            element={
              route.isProtected ? (
                isLoggedIn ? (
                  route.element
                ) : (
                  <Navigate to={"/login"} />
                )
              ) : route.redirect ? (
                <Navigate to={route.redirect} />
              ) : (
                route.element
              )
            }
          />
        );
      })}
    </Routes>
  );
}
