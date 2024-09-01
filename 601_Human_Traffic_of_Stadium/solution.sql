WITH ConsecutiveIds AS (
    SELECT 
        *,
        LEAD(id, 1) OVER (ORDER BY id) AS next_id,
        LEAD(id, 2) OVER (ORDER BY id) AS next_next_id,
        LAG(id, 1) OVER (ORDER BY id) AS previous_id,
        LAG(id, 2) OVER (ORDER BY id) AS previous_previous_id
    FROM Stadium
    WHERE people >= 100
)
SELECT id, visit_date, people
FROM ConsecutiveIds
WHERE (
    next_id = id + 1 AND next_next_id = id + 2 OR
    previous_id = id - 1 AND next_id = id + 1 OR
    previous_id = id - 1 AND previous_previous_id = id - 2
);