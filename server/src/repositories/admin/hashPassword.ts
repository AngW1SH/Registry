import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async (err, hashedPassword) => {
      return hashedPassword;
    });
  });
};
