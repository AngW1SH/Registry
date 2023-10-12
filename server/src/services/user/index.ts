import { User, UserCreate } from "@/entities/user";
import userRepository from "@/repositories/user";

const userServiceFactory = () => {
  return Object.freeze({
    findOrCreate,
  });

  async function findOrCreate(user: UserCreate): Promise<User> {
    const userFound = await userRepository.findByEmail(user.email);

    if (userFound) return userFound;

    const userCreated = await userRepository.create(user);

    return userCreated;
  }
};

const userService = userServiceFactory();

export default userService;
