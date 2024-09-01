SELECT sp.name
FROM SalesPerson sp
LEFT JOIN (
    SELECT DISTINCT o.sales_id
    FROM Orders o
    JOIN Company c ON o.com_id = c.com_id
    WHERE c.name = 'RED'
) AS red_sales ON sp.sales_id = red_sales.sales_id
WHERE red_sales.sales_id IS NULL;
-- SELECT sp.name
-- FROM SalesPerson sp
-- WHERE sp.sales_id NOT IN (
--     SELECT o.sales_id
--     FROM Orders o
--     JOIN Company c ON o.com_id = c.com_id
--     WHERE c.name = 'RED'
-- );
