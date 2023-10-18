import { createHash, getHashes } from "crypto";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

function SHA1(input_data) {
  const sha1 = createHash("sha1");
  sha1.update(input_data);
  let hashedText = sha1.digest("hex").toUpperCase();

  console.log(`SHA-1("${input_data}") = ${hashedText}`);
}

console.log("Message digest object info:");
console.log("Algorithm = " + getHashes().find((hash) => hash === "sha1"));
console.log("Provider = Node.js crypto module");
console.log("ToString = [object Hash]\n");

const input1 = "";
SHA1(input1);

const input2 = "abc";
SHA1(input2);

const input3 = "abcdefghijklmnopqrstuvwxyz";
SHA1(input3);

const rl = createInterface({ input, output });

let program = async () => {
  let prompt;
  console.log("\nAlgorithm = sha1");
  console.log("Provider = Node.js-crypto");

  do {
    prompt = await rl.question("Input Text to HASH: ");
    SHA1(prompt);
  } while (1);
};

program();
