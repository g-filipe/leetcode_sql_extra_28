WITH login_by_id AS (
    SELECT player_id, event_date,ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY event_date) rn
    FROM Activity
)
SELECT player_id, event_date AS first_login
FROM login_by_id
WHERE rn = 1;