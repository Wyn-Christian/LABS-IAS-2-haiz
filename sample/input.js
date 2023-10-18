const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

let main = async () => {
  let answer = await rl.question("Gago ka?: ");
  console.log(`gagi ka pala eh: ${answer}`);
};

main();
