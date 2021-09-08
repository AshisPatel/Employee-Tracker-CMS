INSERT INTO departments (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal'),
('Executive');

INSERT INTO roles (title, salary, department_id)
VALUES
('Salesman', 80000, 1),
('Sales Manager', 120000, 1),
('Software Engineer', 100000, 2),
('Project Manager', 150000, 2),
('Accountant', 90000, 3),
('Finance Manager', 150000, 3),
('Lawyer', 190000, 4),
('Senior Lawyer', 250000, 4),
('CEO', 300000,5 );

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Don', 'Carlos', 1, 2),
('Alexa', 'Fernandez', 2, 6),
('Frazzled', 'Koala', 3, 5),
('Sabrina', 'Crystal', 5, 7),
('Charles', 'Himbonian', 4, 6),
('THE', 'GOAT', 9, NULL),
('Silvonian', 'Boolerino', 6, 6),
('Hacker', 'Person', 3, 5),
('Harvey', 'Birdman', 8, 6),
('Billet', 'Straza', 7,9);