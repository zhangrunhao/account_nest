import * as crypto from 'crypto';

// TODO: 尝试理解crypto逻辑

/**
 * Make Salt
 * @returns salt
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * Encrypt password
 * @param password 密码
 * @param salt 盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) return '';
  const tempSalt = Buffer.from(salt, 'base64');
  // 1000:迭代次数; 16:长度
  return crypto
    .pbkdf2Sync(password, tempSalt, 1000, 16, 'sha1')
    .toString('base64');
}
