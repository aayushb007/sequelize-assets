const Employee = require("../models/Employee"); // Make sure the path is correct based on your project structure
const Asset = require("../models/Asset");
// Create a new employee
async function createEmployee(req, res) {
  try {
    const employee = await Employee.create(req.body);
    return res.status(201).json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
// Get all employees
async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.findAll();
    return res.json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
// Get a specific employee by ID
async function getEmployeeById(req, res) {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Update an employee
async function updateEmployee(req, res) {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    await employee.update(req.body);
    return res.json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
// Delete an employee
async function deleteEmployee(req, res) {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    await employee.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function getAssetForEmployee(req, res) {
  try {
    const employee = await Employee.findByPk(req.params.employeeId, {
      include: Asset,
    });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function createAssetForEmployee(req, res) {
  try {
    const employee = await Employee.findByPk(req.params.employeeId);
    if (!employee) {
     return res.status(404).json({ error: "Employee not found" });
    }

    const asset = await Asset.create(req.body);
    await employee.setAsset(asset);

    return res.status(201).json(asset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getAssetForEmployee,
  createAssetForEmployee,
};
