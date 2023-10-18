import sha1 from "sha1";
import chalk from "chalk";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

let log = (col1, in1, col2, in2) => {
  console.log(chalk[col1](`${in1} =`), chalk[col2].bold.underline(in2));
};

let SHA1_HASH = (input) => {
  const result = sha1(input).toUpperCase();
  log("white", `SHA-1 ("${input}")`, "cyan", result);
};

let main = async () => {
  let input;
  console.clear();
  console.log(chalk.bold("-> SHA 1 Algorithm <-"));

  log("white", "Algorithm", "cyan", "SHA 1");
  log("white", "Provider", "cyan", "Node.js 'sha1' module");
  log("white", "ToString", "cyan", "Hashed Object\n");

  SHA1_HASH("");
  SHA1_HASH("abc");
  SHA1_HASH("abcdefghijklmnopqrstuvwxyz");

  while (1) {
    input = await rl.question(chalk.bold.grey("\nInput Text to HASH: "));
    if (input == "exit") {
      console.clear();
      console.log(chalk.yellow.bold("\nThank you!"));
      process.exit(0);
    }
    SHA1_HASH(input);
  }
  process.exit();
};

main();
