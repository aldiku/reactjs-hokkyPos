import getEnvVariable from "../utils/getEnvVariable";
import crypto from "crypto";

// const { secretKey1, secretKey2, keyLength, IV, iteration } =
//   await getEnvVariable();

const decryptAES256 = async (chiperText) => {
  const { generatedKey, IV } = await getEnvVariable();
  const convertToBuffer = Buffer.from(
    generatedKey.split(" ").map((item) => parseInt(item))
  );

  const UsedIV = Buffer.from(IV.split(" ").map((char) => parseInt(char)));

  var cipher = crypto.createDecipheriv("aes-256-cbc", convertToBuffer, UsedIV);
  cipher.setAutoPadding(true);
  let ciph = cipher.update(Buffer.from(chiperText, "base64"));
  let ciphf = cipher.final();
  return Buffer.concat([ciph, ciphf]).toString();
};

const encryptAES256 = async (plainText) => {
  const { generatedKey, IV } = await getEnvVariable();
  const convertToBuffer = Buffer.from(generatedKey.split(" ").map(Number));

  const UsedIV = Buffer.from(IV.split(" ").map((char) => parseInt(char)));

  var cipher = crypto.createCipheriv("aes-256-cbc", convertToBuffer, UsedIV);
  let ciph = cipher.update(plainText, "utf-8", "base64");
  let ciphf = cipher.final("base64");
  return ciph + ciphf;
};

export { decryptAES256, encryptAES256 };
