import { execSync } from "child_process";
import { getChallengeInfo } from "./getPage.js";
import { generateReadmeMd } from "./callGeminiApi.js";
import { read, writeFileSync } from "fs";
import { getChallengesLinksFromList } from "./getChallengesFromList.js";
// import { markdownConverter } from "./sandbox/testMD.js";
import {markdownConverter } from './markdownConverter.js'
const urls = await getChallengesLinksFromList(
  "https://leetcode.com/problem-list/mjk2zv73/"
);

for (const url of urls) {

  const challengeInfo = await getChallengeInfo(url);
  const readme = markdownConverter(challengeInfo);

  const projectDir = process.env.PROJECT_DIR_PATH;
  const folderName = challengeInfo.title.replace(".", "").replaceAll(" ", "_");

  try {
    execSync(`mkdir -p ${projectDir}/${folderName}`);
    console.log(`Pasta ${folderName} criada com sucesso!`);
  } catch (error) {
    console.error(`Erro ao criar a pasta ${folderName}:`, error);
  }

  writeFileSync(`${projectDir}/${folderName}/README.md`, readme);
  writeFileSync(`${projectDir}/${folderName}/solution.sql`, '');
}
