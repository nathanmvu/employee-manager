
const inquirer = require('inquirer');
const mysql = require('mysql');
const { allowedNodeEnvironmentFlags } = require('process');

const db = new Database({
  host: "localhost",
  port: 3000,
  user: "root",
  password: "password",
  database: "employeeDB"
});

db.connect(function(err) {
  if (err) throw err;
  initPrompt();
})

// Initial Prompts to Usera
initPrompt = () => {
  inquirer.prompt([{
      type: 'list',
      choices: [
        'Add Department', 
        'Add Role', 
        'Add Employee', 
        'View Departments', 
        'View Roles', 
        'View Employees', 
        'Update Employee', 
        'Quit'],
      message: 'What would you like to do?',
      name: 'userOptions'
    }]).then(function(response) {
    switch (response.userOptions) {
      case 'Add Department':
        addDepartment();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'View Departments': 
        viewDepartments();
        break;
      case 'View Roles':
        viewRoles(); 
        break;
      case 'View Employees':
        viewEmployees(); 
        break;
      case 'Update Employee':
        updateEmployee(); 
        break;
      default:
        break;
    }
  });
}

addDepartment = () => {
  inquirer.
  prompt([{
    type: 'input',
    name: 'department',
    message: 'What department would you like to add?: '
  }]).then(function(response) {
    let query = db.query('INSERT INTO department SET ?', {department: res.name},
    function(err, res) {
      if (err) throw err;
      console.table(res);
      initPrompt();
    });
  });
}

addRole = () => {
  inquirer
  .prompt([{
    type: 'input',
    name: 'roleName',
    message: 'What role would you like to add?: '
  }]).then(function(response) {
    let query = db.query('INSERT INTO role SET ?', {roleName: res.name},
    function(err, res) {
      if (err) throw err;
      console.table(res);
      initPrompt();
    });
  });
}

addEmployee = () => {
  
}

viewDepartments = () => {
  
}