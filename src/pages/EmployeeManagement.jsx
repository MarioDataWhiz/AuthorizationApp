import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '@asgardeo/auth-react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { format, parseISO, isValid } from 'date-fns';

const EmployeeManagement = () => {
  const { state, signIn, signOut } = useAuthContext();
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', birthdate: '', salary: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (state.isAuthenticated) {
      fetchEmployees();
    } else {
      signIn();
    }
  }, [state.isAuthenticated]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5001/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEmployee = async () => {
    try {
      await axios.post('http://localhost:5001/employees', formData);
      fetchEmployees();
      setFormData({ first_name: '', last_name: '', email: '', birthdate: '', salary: '' });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditId(employee.employee_id);
    setFormData({
      ...employee,
      birthdate: format(parseISO(employee.birthdate), 'yyyy-MM-dd')
    });
  };

  const handleUpdateEmployee = async () => {
    try {
      await axios.put(`http://localhost:5001/employees/${editId}`, formData);
      fetchEmployees();
      setEditId(null);
      setFormData({ first_name: '', last_name: '', email: '', birthdate: '', salary: '' });
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  if (!state.isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Employee Management</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Birthdate</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.employee_id}>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.last_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  {isValid(parseISO(employee.birthdate)) ? format(parseISO(employee.birthdate), 'MM/dd/yyyy') : 'Invalid Date'}
                </TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditEmployee(employee)}>Edit</Button>
                  <Button onClick={() => handleDeleteEmployee(employee.employee_id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: '20px' }}>
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          label="Birthdate"
          name="birthdate"
          type="date"
          value={formData.birthdate}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
          sx={{ backgroundColor: 'white' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Salary"
          name="salary"
          value={formData.salary}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
          sx={{ backgroundColor: 'white' }}
        />
        {editId ? (
          <Button variant="contained" color="primary" onClick={handleUpdateEmployee}>
            Update Employee
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddEmployee}>
            Add Employee
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;