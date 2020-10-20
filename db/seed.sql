--- Department filler ---
INSERT INTO department (name)
VALUE ("Sales"), ("Engineering"), ("Finance"), ("Legal");

--- Role filler ---
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 95000, 1), ('Sales Analyst', 80000, 1), ('UI/UX Designer', 85000, 2), ('Software Engineer', 125000, 2), ('Accountant', 80000, 3), ('Legal Representative', 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jonas', 'Franck', 1, null), ('Eshan', 'Mcmanus', 1, 1), ('Priyanka', 'Garg', 2, 2)