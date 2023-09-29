import * as bcrypt from 'bcrypt';

export const passwordService = {
  generateHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },

  comparePasswords(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
};