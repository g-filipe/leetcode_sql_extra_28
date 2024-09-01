CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
    BEGIN
        RETURN (
            WITH second_highest_salary AS (
                SELECT *, DENSE_RANK() OVER (ORDER BY salary DESC) AS rk_salary
                FROM Employee
            )
            SELECT MAX(salary) AS SecondHighestSalary
            FROM second_highest_salary
            WHERE rk_salary = n
    );
END