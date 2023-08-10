const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Create a new employee
router.post('/', employeeController.createEmployee);
// Get all employees
router.get('/', employeeController.getAllEmployees);
// Get a specific employee by ID
router.get('/:id', employeeController.getEmployeeById);
// Update an employee
router.put('/:id', employeeController.updateEmployee);
// Delete an employee
router.delete('/:id', employeeController.deleteEmployee);
router.post('/asset/:employeeId', employeeController.createAssetForEmployee);
router.get('/asset/:employeeId', employeeController.getAssetForEmployee);


module.exports = router;
