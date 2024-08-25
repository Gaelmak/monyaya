import CryptoJS from 'crypto-js';

interface HashedPassword {
  hash: string;
  salt: string;
}

export function saltPassword(password: string): HashedPassword {
  // Check if the password is empty
  if (!password) {
    throw new Error('Password cannot be empty');
  }

  // Generate a random salt if not provided
  const salt = CryptoJS.lib.WordArray.random(128 / 8);

  // Hash password with salt
  const saltedPassword = CryptoJS.PBKDF2(password, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  });

  // Convert to hex string
  const hash = saltedPassword.toString(CryptoJS.enc.Hex);

  // Return hash and salt
  return {
    hash,
    salt: salt.toString(CryptoJS.enc.Hex),
  };
}

export function verifyPassword(password: string, hashedPassword: string, salt: string): boolean {
  // Hash provided password with stored salt
  const saltedPassword = CryptoJS.PBKDF2(password, CryptoJS.enc.Hex.parse(salt), {
    keySize: 512 / 32,
    iterations: 1000,
  });

  // Convert to hex string
  const hash = saltedPassword.toString(CryptoJS.enc.Hex);

  // Compare the computed hash with the stored hash
  return hash === hashedPassword;
}
