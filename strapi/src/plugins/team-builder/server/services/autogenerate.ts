import { Strapi } from "@strapi/strapi";
import { UserDetailed } from "../entities/User";

function shuffle<T>(array: T[]) {
  let currentIndex = array.length,
    randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default ({ strapi }: { strapi: Strapi }) => ({
  async autogenerate(users: UserDetailed[]) {
    const length = Math.floor(users.length / 5) + 1;

    const randomized = shuffle(users.map((user) => user.id));

    const teams = Array(length)
      .fill(0)
      .map((_) => ({ students: [] as number[] }));

    randomized.forEach((userId, index) => {
      const teamIndex = Math.min(Math.floor(index / 5), length - 1);
      teams[teamIndex].students.push(userId);
    });

    return teams;
  },
});
