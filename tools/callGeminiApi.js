import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateReadmeMd(challengeInfo) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
  I need to convert a given text into Markdown format according to specific rules. Please follow these instructions to process the text:
  
  1. **Title and Difficulty Formatting:**
      
     - The text includes a title, difficulty level, and description of the challenge.
     - Format the title as a level 2 heading with \`## \${title}\`. Get title from ${challengeInfo.title}
     - Format the difficulty as a level 3 heading with \`### Difficulty: \${difficulty}\`. Get difficulty from ${challengeInfo.difficulty}
     - Ensure there is a \`<br>\` tag and a line break after the difficulty heading.
     - get description from ${challengeInfo.description}
  
  2. **Bold Keywords and Colon:**
     - Convert specific keywords into bold with a colon after them:
       - Convert \`Input:\` to \`**Input:**\`.
       - Convert \`Output:\` to \`**Output:**\`.
       - Convert \`Explanation:\` to \`**Explanation:**\` with an extra line break after it.
     - Ensure there is a blank line above and below each of these keywords.
  
  3. **Table Conversion:**
     - Convert tables from the format with \`+\` and \`-\` characters into Markdown table format using \`|\` characters.
     - After the last row of each table, replace the ending \`+\` characters line with a \`<br>\` tag to separate tables from the following content.
     - Ensure there are blank lines before and after each table.
  
  4. **Remove Non-Breaking Spaces:**
     - Remove any non-breaking spaces (Unicode \`\\u00a0\`) from the text.
  
  5. **Additional Rules:**
     - For each line in the text:
       - If the line starts with \`Table:\` or contains the word \`table:\` and does not match a keyword pattern, add a blank line before it and after it.
       - If the line contains \`example\`, \`input\`, \`output\`, or \`explanation\` (case-insensitive), format it according to the keyword rules.
       - If the line matches the table border format (\`+\` and \`-\`), convert the border lines to Markdown table format and add \`<br>\` tags appropriately.
  
  **Example Input Text:**
  
  \`\`\`
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
  \`\`\`
  
  **Expected Markdown Output:**
  
  \`\`\`
  ## Title of the Challenge
  
  ### Difficulty: Easy
  <br>
  
  **Table: Employee**
  
  | Column Name | Type    |
  |-------------|---------|
  | id          | int     |
  | name        | varchar |
  | salary      | int     |
  | managerId   | int     |
  <br>
  
  **Example 1:**
  
  **Input:**
  
  **Employee table:**

  | id | name  | salary | managerId |
  |----|-------|--------|-----------|
  | 1  | Joe   | 70000  | 3         |
  | 2  | Henry | 80000  | 4         |
  | 3  | Sam   | 60000  | Null      |
  | 4  | Max   | 90000  | Null      |
  <br>
  
  **Output:**
  
  | Employee |
  |----------|
  | Joe      |
  <br>
  
  **Explanation:**
  
  Joe is the only employee who earns more than his manager.
  \`\`\`
  
  Please ensure to follow these guidelines accurately to convert the text to Markdown format.
  `;
  
    
  const result = await model.generateContent(prompt);

  return result.response.text();
}
