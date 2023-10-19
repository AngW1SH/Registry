import { Tag } from "@/entities/tag";
import tagRepository from "@/repositories/tag";

const tagServiceFactory = () => {
  return Object.freeze({
    findInFilters,
  });

  async function findInFilters(query?: string): Promise<Tag[]> {
    return tagRepository.findMany({ query, limit: 5 });
  }
};

const tagService = tagServiceFactory();

export default tagService;
