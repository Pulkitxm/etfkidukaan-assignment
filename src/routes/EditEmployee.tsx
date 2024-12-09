import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeContext } from "@/context/employee";
import { LuLoader } from "react-icons/lu";
import {
  Typography,
  Grid,
  Avatar,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { AuthContext } from "@/context/auth";
import { OPERATIONS } from "@/types/user";
import { Employee } from "@/types/employee";

function EditEmployee() {
  const { id } = useParams<{ id: string }>();
  const { employees, updateEmployee, loading } = useContext(EmployeeContext);
  const { isAuthorizedTo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Employee | null>(null);

  useEffect(() => {
    const foundEmployee = employees.find(
      (_, index) => index + 1 === parseInt(id!)
    );
    setEmployee(foundEmployee || null);
    setFormData(foundEmployee || null);
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
    write: isAuthorizedTo(OPERATIONS.WRITE),
  };

  if (!authStatus.write) {
    return (
      <Typography variant="h6" color="error">
        You do not have permission to edit this employee
      </Typography>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const [field, subField] = name.split(".");
      setFormData((prev) => ({
        ...prev!,
        [field]: {
          // @ts-expect-error - I know this is safe
          ...prev![field as keyof Employee],
          [subField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      updateEmployee(parseInt(id!) - 1, formData);
      navigate(`/employees/${id}`);
    }
  };

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Edit Employee Details
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
            src={formData?.pictureUrl || employee.pictureUrl}
            sx={{ width: 120, height: 120 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" component="h2" sx={{ marginBottom: "20px" }}>
            {employee.name}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={formData?.name || ""}
                  onChange={handleChange}
                  name="name"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={formData?.email || ""}
                  onChange={handleChange}
                  name="email"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  value={formData?.phone || ""}
                  onChange={handleChange}
                  name="phone"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Job Title"
                  variant="outlined"
                  fullWidth
                  value={formData?.jobTitle || ""}
                  onChange={handleChange}
                  name="jobTitle"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Department"
                  variant="outlined"
                  fullWidth
                  value={formData?.department || ""}
                  onChange={handleChange}
                  name="department"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Street"
                  variant="outlined"
                  fullWidth
                  value={formData?.address?.street || ""}
                  onChange={(e) =>
                    handleChange({
                      ...e,
                      target: { ...e.target, name: "address.street" },
                    })
                  }
                  name="address.street"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  value={formData?.address?.city || ""}
                  onChange={(e) =>
                    handleChange({
                      ...e,
                      target: { ...e.target, name: "address.city" },
                    })
                  }
                  name="address.city"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  value={formData?.address?.state || ""}
                  onChange={(e) =>
                    handleChange({
                      ...e,
                      target: { ...e.target, name: "address.state" },
                    })
                  }
                  name="address.state"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Zip Code"
                  variant="outlined"
                  fullWidth
                  value={formData?.address?.zipCode || ""}
                  onChange={(e) =>
                    handleChange({
                      ...e,
                      target: { ...e.target, name: "address.zipCode" },
                    })
                  }
                  name="address.zipCode"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Profile Picture (URL)
            </Typography>
            <TextField
              label="Picture URL"
              variant="outlined"
              fullWidth
              value={formData?.pictureUrl || ""}
              onChange={handleChange}
              name="pictureUrl"
            />

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditEmployee;
