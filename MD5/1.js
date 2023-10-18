import { createHash } from "crypto";
import chalk from "chalk";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = createInterface({ input, output });

function MD5_HASH(input) {
  const hash = createHash("md5");
  hash.update(input);
  let hashed = hash.digest("hex");
  console.log(
    chalk.white(`The MD5 code for input string is '${input}' :`),
    chalk.cyan.bold.underline(`\n\t\t= ${hashed}`)
  );
  console.log(chalk.yellow("\t\tMD5 Encryption Successfully Completed!!!"));
}

let main = async () => {
  let input;
  console.clear();
  console.log(chalk.yellow.bold("\tMD5 ENCRYPTION ALGORITHM IN C"));

  while (1) {
    input = await rl.question("\nInput String to be Encrypted using MD5: ");
    MD5_HASH(input);
  }
};

main();
