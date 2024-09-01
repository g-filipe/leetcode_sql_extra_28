SELECT 
    u.user_id AS buyer_id,
    u.join_date, 
    COUNT(IF(YEAR(o.order_date) = 2019, 1, NULL)) AS orders_in_2019
FROM Users u
LEFT JOIN Orders o ON o.buyer_id = u.user_id
GROUP BY u.user_id, u.join_date
ORDER BY u.user_id;