import {exec} from "child_process";
import {directories, numbers} from './directories.js'

let formattedChallengeTitleNumber = numbers.map((number) => {
  return number + ". ";
});


let formattedDirectoryNumber = numbers.map((number) => {
  return number.replace('.', '') + "_";
});

let formattedDirectoryTitle = challengesTitle.map((title) => {
  return title.replaceAll(" ", "_");
})

export let directories = formattedDirectoryNumber.map((number, index) => {
  return number + formattedDirectoryTitle[index];
});

let formattedChallengeTitle = formattedChallengeTitleNumber.map((number, index) => {
  return number + challengesTitle[index];
})


console.log(directories.length)
console.log(directories)
console.log()
console.log('-----------------------------------------------------')
console.log()
console.log(formattedChallengeTitle.length)
console.log(formattedChallengeTitle)