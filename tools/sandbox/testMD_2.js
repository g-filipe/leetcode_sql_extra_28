function convertTablesToMarkdown(description) {
  // Regex to capture tables in the description
  const tableRegex = /\+[-+]+\+\n(\|.+\|\n)+\+[-+]+\+/g;

  // Function to convert a matched table to markdown format and add <br> at the end
  const convertTable = (table) => {
    const rows = table.split('\n').filter((line) => line.includes('|'));

    // Remove the separator rows and format the table correctly
    const formattedTable = rows
      .map((row) => row.trim().replace(/^\| | \|$/g, '|')) // Clean up spaces at the edges
      .join('\n');

    // Add <br> at the end of the table
    return `${formattedTable}\n<br>`;
  };

  // Replace each table in the description with its markdown equivalent and add <br> after the last row
  description = description.replace(tableRegex, (table) =>
    convertTable(table).replace(/\n\+\-[-+]+\+$/, '\n<br>')
  );

  // Keywords to be bolded with blank lines above and below, and a colon added
  

  return description.trim();
}

function generateMarkdown(challengeInfo) {
  const title = `## ${challengeInfo.title}`;
  const difficulty = `### Difficulty: ${challengeInfo.difficulty}`;
  const description = convertTablesToMarkdown(challengeInfo.description);

  const markdown = `
${title}
  
${difficulty}

${description}
`;

  return markdown.trim();
}

// Example usage
const challengeInfo = {
  title: "181. Employees Earning More Than Their Managers",
  difficulty: "Easy",
  description: `
Table: Employee
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| salary      | int     |
| managerId   | int     |
+-------------+---------+
This table contains the employee information.

Example 1:
Input: 
Employee table:
+----+-------+--------+-----------+
| id | name  | salary | managerId |
+----+-------+--------+-----------+
| 1  | Joe   | 70000  | 3         |
| 2  | Henry | 80000  | 4         |
| 3  | Sam   | 60000  | Null      |
| 4  | Max   | 90000  | Null      |
+----+-------+--------+-----------+

Output: 
+----------+
| Employee |
+----------+
| Joe      |
+----------+
Explanation: Joe is the only employee who earns more than his manager.
`,
};

console.log(generateMarkdown(challengeInfo));
