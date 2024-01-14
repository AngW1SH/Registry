import { User, UserCreate } from "@/entities/user";
import userRepository from "@/repositories/user";

const userServiceFactory = () => {
  return Object.freeze({ findById, findOrCreate });

  async function findById(id: number): Promise<User | null> {
    const user = await userRepository.findOne({ id: id });

    return user;
  }

  async function findOrCreate(user: UserCreate): Promise<User | null> {
    const userFound = await userRepository.findOne({ email: user.email });

    if (userFound) return userFound;

    const userCreated = await userRepository.create(user);

    return userCreated;
  }
};

const userService = userServiceFactory();

export default userService;
