import { genSaltSync, hashSync, compareSync } from 'bcrypt';



const SALT = genSaltSync(10);

export const hashPassword = (password: string): string => {
  return hashSync(password, SALT);
}

export const comparePassword = (password: string, hash: string): boolean => {
  return compareSync(password, hash);
}
