const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function stringToBinary(input) {
  const binary = [];
  for (let i = 0; i < input.length; i++) {
    const bin = input.charCodeAt(i).toString(2);
    binary.push(bin.padStart(8, "0")); // pad each byte to 8 bits
  }
  return binary.join("");
}

function xor(bits1, bits2) {
  let result = "";
  for (let i = 0; i < bits1.length; i++) {
    result += bits1[i] === bits2[i] ? "0" : "1";
  }
  return result;
}

function encrypt(plainText) {
  const binaryText = stringToBinary(plainText).slice(0, 64); // Convert to binary and trim to 64 bits

  if (binaryText.length < 64) {
    console.log(
      "The entered string is too short for 64-bit representation. Please provide a longer string."
    );
    return;
  }

  const first32 = binaryText.slice(0, 32);
  const second32 = binaryText.slice(32);

  const xorResult = xor(first32, second32);

  return second32 + xorResult; // Swap and combine
}

function decrypt(cipherText) {
  if (cipherText.length !== 64) {
    console.log("Please provide a 64-bit cipher text for decryption.");
    return;
  }

  const first32 = cipherText.slice(32);
  const second32 = cipherText.slice(0, 32);

  const xorResult = xor(first32, second32);

  return xorResult + first32; // Swap back and combine
}

rl.question(
  "Enter a string to convert to 64-bit binary and encrypt: ",
  (inputString) => {
    const encryptedText = encrypt(inputString);
    console.log(`Encrypted: ${encryptedText}`);

    const decryptedText = decrypt(encryptedText);
    console.log(`Decrypted: ${decryptedText}`);

    rl.close();
  }
);
