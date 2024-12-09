import { useState, useContext } from "react";
import { EmployeeContext } from "@/context/employee";
import { Link } from "react-router-dom";
import { LuLoader } from "react-icons/lu";
import { OPERATIONS } from "@/types/user";
import { AuthContext } from "@/context/auth";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function EmployeeList() {
  const { isAuthorizedTo } = useContext(AuthContext);
  const { employees, loading, deleteEmployee } = useContext(EmployeeContext);

  const authStatus = {
    read: isAuthorizedTo(OPERATIONS.READ),
    write: isAuthorizedTo(OPERATIONS.WRITE),
    delete: isAuthorizedTo(OPERATIONS.DELETE),
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "jobTitle", headerName: "Job Title", width: 180 },
    { field: "address", headerName: "Address", width: 300 },
    { field: "hireDate", headerName: "Hire Date", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          {authStatus.read && (
            <Link to={`/employees/${params.row.id}`} className="text-blue-500">
              View
            </Link>
          )}
          {authStatus.write && (
            <Link
              to={`/employees/${params.row.id}/edit`}
              className="text-blue-500 ml-2"
            >
              Edit
            </Link>
          )}
          {authStatus.delete && (
            <Button
              className="text-red-500 ml-2"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          )}
        </div>
      ),
    },
  ];

  const rows: GridRowsProp = employees.map((employee, index) => ({
    id: index + 1,
    name: employee.name,
    department: employee.department,
    email: employee.email,
    phone: employee.phone,
    jobTitle: employee.jobTitle,
    address: `${employee.address.street}, ${employee.address.city}, ${employee.address.state} ${employee.address.zipCode}`,
    hireDate: employee.hireDate,
  }));

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 12,
  });

  const handlePaginationChange = (model: {
    page: number;
    pageSize: number;
  }) => {
    setPaginationModel(model);
  };

  const handleDelete = (id: number) => {
    deleteEmployee(id-1);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <LuLoader className="animate-spin h-12 w-12 text-blue-500" />
        </div>
      ) : (
        <Paper sx={{ height: "100%", width: "100%" }}>
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pagination
              paginationMode="client"
              paginationModel={paginationModel}
              onPaginationModelChange={handlePaginationChange}
              pageSizeOptions={[10, 20, 30]}
              sx={{ border: 0 }}
            />
          </div>
        </Paper>
      )}
    </div>
  );
}
