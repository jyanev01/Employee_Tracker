USE Employees_traceker_db;

INSERT INTO departments (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');



INSERT INTO roles (title, salary, department_id )
VALUES ('CEO', 200, 1),
        ('CTO', 130, 2),
        ('CFO', 120, 3),
        ('Legal Counsel', 140, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('James', 'Bond', 1, NULL),
    ('Mrs', 'MoneyPenny',3, NULL),
    ('John', 'Smith', 2, NULL),
    ('Jeffrey', 'Baker', 4, NULL)