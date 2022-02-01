USE employees_db;

INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');



INSERT INTO role (title, salary, department_id )
VALUES ('CEO', 200, 1),
        ('CTO', 130, 2),
        ('CFO', 120, 3),
        ('Legal Counsel', 140, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('James', 'Bond', 1, NULL),
    ('Mrs', 'MoneyPenny',3, 1),
    ('John', 'Smith', 2, 1),
    ('Jeffrey', 'Baker', 4, NULL)