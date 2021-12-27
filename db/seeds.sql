-- seed department table
INSERT INTO department (name)
  VALUES
  ('Human Resources'),
  ('Accounting'),
  ('Information Services'),
  ('Legal'),
  ('Marketing');

-- seed role table
INSERT INTO role (title, salary, department_id)
  VALUES
  ('HR Generalist', 45000, 1),
  ('HR Manager', 65000, 1),
  ('Recruiter', 38000, 1),
  ('Accountant', 80000, 2),
  ('Accounting Manager', 110000, 2),
  ('Auditor', 150000, 2),
  ('Service Desk Representative', 40000, 3),
  ('Automation Engineer', 70000, 3),
  ('IS Manager', 75000, 3),
  ('Attorney', 125000, 4),
  ('Legal Manager', 90000, 4),
  ('Legal Assistant', 40000, 4),
  ('Marketing Manager', 60000, 5),
  ('Graphics Specialist', 48000, 5),
  ('Social Media Technician', 38500, 5);

-- seed employee table
-- NOTE: cannot use a manager_id value that is a higher value than the current employee.id you're using it on because that manager won't exist yet
INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES
  ('Dean', 'Gardner', 5, NULL),
  ('Eliza', 'Pancakes', 2, NULL),
  ('Tom', 'Nook', 4, 2),
  ('Arthur', 'Morgan', 11, NULL),
  ('Lenny', 'St. Denis', 14, 4),
  ('Rost', 'Horitzon', 3, 2),
  ('Daisy', 'Plum', 10, 4),
  ('Tony', 'Stark', 13, NULL),
  ('Kenai', 'Barry', 9, NULL),
  ('Bernard', 'Elfman', 15, 8),
  ('Bella', 'Goth', 14, 8),
  ('Valerie', 'Aron', 7, 9),
  ('Jakob', 'Kuisl', 7, 9);
