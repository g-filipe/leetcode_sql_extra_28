WITH sal_per_dept AS (
    SELECT *, RANK() OVER(PARTITION BY departmentId ORDER BY salary DESC) rk
    FROM Employee
)
SELECT d.name AS Department, spd.name AS Employee, spd.salary AS Salary
FROM sal_per_dept spd
JOIN Department d ON d.id = spd.departmentId
WHERE spd.rk = 1;