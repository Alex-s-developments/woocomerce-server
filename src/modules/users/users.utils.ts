import { hash, compare, genSalt } from 'bcrypt';

export async function hashPassword(password: string) {
  const rounds = 10;
  const salt = await genSalt(rounds);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(password: string, hash: string) {
  return compare(password, hash);
}
