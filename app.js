//Content Managment Systems (CMS)
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeeDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected as id ' + connection.threadId + '\n');
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
        'QUIT'],
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
        connection.end
        break;
    }
  });
}

addDepartment = () => {
  console.log("Inserting a new department.\n");
  inquirer.
  prompt([{
    type: 'input',
    name: 'department',
    message: 'What department would you like to add?: '
  }]).then(function(res) {
    let query = connection.query('INSERT INTO department SET ?', {name: res.department},
    function(err, res) {
      if (err) throw err;
      connection.query('SELECT * FROM department', function (err, res){
        console.table(res);
        initPrompt();
      });
    });
  });
}

addRole = () => {
  console.log("Inserting a new role.\n");
  const departments = [];
  connection.query('SELECT * FROM department', function(err, res) {
    if (err) throw err;
    for(let i = 0; i < res.length; i++) {
      departments.push({name: res[i].name, value: res[i].id});
    }
  })
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the role to add? '
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role? '
    },
    {
      type: 'list',
      name: 'deptID',
      choices: departments,
      message: 'What is the ID of the department this role belongs to? '
    }
  ]).then(function(res) {
    connection.query('INSERT INTO role SET ?',
    {
      title: res.title,
      salary: res.salary,
      department_id: res.deptID
    },
    function(err, res) {
      if (err) throw err;
      initPrompt();
    });
  });
}

selectRole = () => {

}

addEmployee = () => {
  console.log("Inserting a new employee.\n");
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter employee first name: '
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter employee last name: '
    },
    {
      type: 'input',
      name: 'role',
      message: 'Enter employee last name: '
    },
    {
      type: 'input',
      name: 'managerName',
      message: 'Who is their manager?'
    }
  ]).then(function(res) {
    let query = connection.query('INSERT INTO employees SET ?', res,
    function(err, res) {
      if (err) throw err;
      console.table(res);
      initPrompt();
    })
  })
}

viewDepartments = () => {
  connection.query('SELECT * FROM department', function(err, res) {
    if (err) throw err;
    console.table(res);
    initPrompt();
  })
}

viewRoles = () => {
  connection.query('SELECT * FROM role LEFT JOIN department ON department.id = role.department_id', function(err, res) {
    if (err) throw err;
    console.table(res);
    initPrompt();
  })
}

updateEmployee = () => {
  connection.query('SELECT first_name, last_name, id FROM employees', function(err, res) {
    if (err) throw err;
    let employeeInfo = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}))
    inquirer
    .prompt([{
      type: 'list',
      name: 'employees',
      choices: employeeInfo
    },
    {
      type: 'input',
      name: 'newRole',
      message: "What is the employee's new role? "
    }
    ]).then(function(res) {
      connection.query('UPDATE employee SET role_ID = ? WHERE first_name = ?', [res.employees, res.newRole], function(err, res) {
        if (err) throw err;
        console.table(res);
        initPrompt();
      });
    });
  });
}