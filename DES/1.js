const readline = require("readline");
const CryptoJS = require("crypto-js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let encrypted, decrypted;

rl.question("Enter the plaintext: ", (plaintext) => {
  rl.question('Enter a 8-byte key (e.g. "password"): ', (key) => {
    if (key.length !== 8) {
      console.log("Key must be 8 bytes long.");
      rl.close();
      return;
    }

    // Encrypt
    encrypted = CryptoJS.DES.encrypt(plaintext, key).toString();

    console.log(`Encrypted: ${encrypted}`);

    // rl.close();
    rl.question("Enter the ciphertext: ", (ciphertext) => {
      rl.question('Enter a 8-byte key (e.g. "password"): ', (key) => {
        if (key.length !== 8) {
          console.log("Key must be 8 bytes long.");
          rl.close();
          return;
        }

        // Encrypt
        decrypted = CryptoJS.DES.decrypt(ciphertext, key).toString(
          CryptoJS.enc.Utf8
        );

        console.log(`Decrypted: ${decrypted}`);

        rl.close();
      });
    });
  });
});
