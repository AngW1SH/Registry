import { User, UserCreate } from "@/entities/user";
import { BadRequestError } from "@/helpers/errors";
import userRepository from "@/repositories/user";

const userServiceFactory = () => {
  return Object.freeze({ findById, findOrCreate });

  async function findById(id: number): Promise<User | null> {
    const user = await userRepository.findOne({ id: id });

    return user;
  }

  async function findOrCreate(
    user: UserCreate,
    providerName: string
  ): Promise<User | null> {
    if (!user.services.length)
      throw new BadRequestError("user.services should not be empty");

    const provider = user.services.find(
      (service) => service.provider == providerName
    );

    if (provider) {
      const userFound = await userRepository.findOneByService({
        provider: user.services[0].provider,
        value: user.services[0].value,
      });

      if (userFound) return userFound;
    }

    const userCreated = await userRepository.create(user);

    return userCreated;
  }
};

const userService = userServiceFactory();

export default userService;
