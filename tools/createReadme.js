import { directories } from "./directories.js";
import fs from "fs";
const prefix = `https://github.com/g-filipe/hackerrank_prepare_sql/tree/main`;

try {
  directories.forEach((directoryPath) => {
    let formattedDirectoryPath = directoryPath
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const files = fs.readdirSync(directoryPath, { withFileTypes: true });
    const directories = files
      .filter((file) => file.isDirectory())
      .map((dir) => dir.name);

    let table = `<table>
    <thead>
      <tr>
        <th>${formattedDirectoryPath}</th>
        <th>Difficulty</th>
      </tr>
    </thead>
    <tbody>
`;

    directories.forEach((dirName) => {
      let formattedDirectoryName = dirName.replaceAll("_", " ");
      const path = `${directoryPath}/${dirName}`;
      let difficulty;

      try {
        difficulty = getDifficulty(`${path}/README.md`);
      } catch (err) {
        console.error(err);
        difficulty = "Unknown";
      }

      let formattedDifficulty;
      if (difficulty === "Easy") {
        formattedDifficulty = `$\{\\color{green}\\text{Easy}\}$`;
      } else if (difficulty === "Medium") {
        formattedDifficulty = `$\{\\color{orange}\\text{Medium}\}$`;
      } else if (difficulty === "Hard") {
        formattedDifficulty = `$\{\\color{red}\\text{Hard}\}$`;
      } else {
        formattedDifficulty = difficulty;
      }

      const tr = `      <tr>
        <td>
          <a href="${prefix}/${path}">${formattedDirectoryName}</a>
        </td>
        <td>${formattedDifficulty}</td>
      </tr>
`;
      table += tr;
    });

    table += `  </tbody>
</table>
`;

    console.log(table);
  });
} catch (err) {
  console.error("Erro ao ler a pasta:", err);
}

function getDifficulty(filePath) {
  if (!fs.existsSync(filePath)) {
    throw `Arquivo não encontrado: ${filePath}`;
  }

  const fileContent = fs.readFileSync(filePath);
  const result = fileContent.toString().match(/Difficulty: (\w+)/);

  if (!result || !result[1]) {
    throw `Erro ao extrair a dificuldade no arquivo: ${filePath}`;
  }

  return result[1];
}
