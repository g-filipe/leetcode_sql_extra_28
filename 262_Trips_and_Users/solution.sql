SELECT 
    request_at AS Day,
    ROUND(SUM(IF(status LIKE 'cancelled%', 1, 0)) / COUNT(*), 2) AS 'Cancellation Rate'
FROM Trips
JOIN Users cl ON client_id = cl.users_id
JOIN Users dv ON driver_id = dv.users_id
WHERE cl.banned <> 'Yes' AND dv.banned <> 'Yes' AND request_at BETWEEN '2013-10-01' AND '2013-10-03' 
GROUP BY Day;