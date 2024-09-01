SELECT employee_id, IF(employee_id % 2 != 0 AND LOWER(name) NOT LIKE 'm%', salary, 0) AS bonus
FROM Employees
ORDER BY employee_id;