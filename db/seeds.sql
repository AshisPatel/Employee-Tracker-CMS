INSERT INTO departments (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Salesman', 80000, 1),
('Sales Manager', 120000, 1),
('Software Engineer', 100000, 2),
('Accountant', 90000, 3),
('Finance Manager', 150000, 3),
('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Alpha', 'Chad', 2, 2),
('Sabrina', 'The Witch', 6, NULL),
('Himbo', 'Vibes', 1, 1),
('Frazzled', 'Koala', 4, 5),
('CASH', 'MONEY', 5, NULL),
('Hacker', 'Person', 3, 2);