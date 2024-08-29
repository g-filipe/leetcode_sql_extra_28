## 182. Duplicate Emails
### Difficulty: Easy
<br>


**Table: Person**

| Column Name | Type    |
|-------------|---------|
| id          | int     |
| email       | varchar |
<br>

id is the primary key (column with unique values) for this table.
Each row of this table contains an email. The emails will not contain uppercase letters.




Write a solution to report all the duplicate emails. Note that it's guaranteed that the emailfield is not NULL.

Return the result table in any order.

Theresult format is in the following example.


**Example 1:**

**Input:** 


**Person table:**


| id | email   |
|----|---------|
| 1  | a@b.com |
| 2  | c@d.com |
| 3  | a@b.com |
<br>

**Output:** 


| Email   |
|---------|
| a@b.com |
<br>

**Explanation:**

 a@b.com is repeated two times.

