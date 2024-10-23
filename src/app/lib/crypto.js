import CryptoJS from "crypto-js";
const { CRYPTO_KEY } = process.env;

export const encrypt = (value) => { //encrypt values from the server
  const encrypted = CryptoJS.AES.encrypt(value, CRYPTO_KEY).toString();
  return encodeURIComponent(encrypted);
}

export const decrypt = (value) => { //decryp
    const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(value), CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
    return decrypted;
}