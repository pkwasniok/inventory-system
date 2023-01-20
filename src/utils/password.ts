import { genSaltSync, hashSync, compareSync } from 'bcrypt';



const SALT = genSaltSync(10);

export const hashPassword = (password: string): string => {
  return hashSync(password, SALT);
}

export const comparePassword = (password: string|undefined, hash: string|undefined|null): boolean => {
  if (password == undefined || hash == undefined || hash == null) {
    return false;
  }

  return compareSync(password, hash);
}
