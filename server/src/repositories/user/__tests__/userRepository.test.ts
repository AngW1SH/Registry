import {
  staticUserCreate,
  staticUserCreateResponseStrapi,
  staticUserResponseStrapi,
} from "@/entities/user";
import userRepository from "..";

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(staticUserResponseStrapi),
  })
) as jest.Mock;

describe("User Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(staticUserResponseStrapi),
      })
    ) as jest.Mock;
  });

  describe("findByEmail method", () => {
    it("should return a user when everything is okay", async () => {
      const user = await userRepository.findByEmail("st072603@student.spbu.ru");

      expect(user).toBeDefined();
    });

    it("should return null if no user is found", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: () => Promise.resolve({ data: [] }),
      });
      const user = await userRepository.findByEmail("st072603@student.spbu.ru");

      expect(user).toBeNull();
    });
  });

  describe("findById method", () => {
    it("should return a user when everything is okay", async () => {
      const user = await userRepository.findById(2);

      expect(user).toBeDefined();
    });

    it("should return null if no user is found", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: () => Promise.resolve({ data: [] }),
      });
      const user = await userRepository.findById(2);

      expect(user).toBeNull();
    });
  });

  describe("create method", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(staticUserCreateResponseStrapi),
        })
      ) as jest.Mock;
    });
    it("should return created user when everything is okay", async () => {
      const user = await userRepository.create(staticUserCreate);

      expect(user).toBeDefined();
    });

    it("should throw an error if the user is not created", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: () => Promise.resolve({ data: {} }),
      });

      expect(
        async () => await userRepository.create(staticUserCreate)
      ).rejects.toThrow();
    });
  });
});
