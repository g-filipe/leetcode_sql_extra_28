WITH CTE AS (
    SELECT *, COUNT(*) quantity
    FROM Orders
    GROUP BY customer_number
)
SELECT c1.customer_number
FROM CTE c1
WHERE c1.quantity = (
    SELECT MAX(c2.quantity)
    FROM CTE c2
);