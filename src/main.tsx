import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { AuthProvider } from "./providers/auth.tsx";
import { BrowserRouter } from "react-router-dom";
import { EmployeeProvider } from "./providers/employee.tsx";

function AllProviders({ children }: { children: JSX.Element }) {
  return (
    <AuthProvider>
      <EmployeeProvider>{children}</EmployeeProvider>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AllProviders>
      <App />
    </AllProviders>
  </BrowserRouter>
);
