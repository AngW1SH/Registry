import { getCategoryFromStrapiDTO } from "@/db/strapi/adapters/category";
import { strapi } from "@/db/strapi/client";
import { selectTag } from "@/db/strapi/queries/tag";
import { populate } from "dotenv";

const categoryRepositoryFactory = () => {
  return Object.freeze({ getFeatured });

  async function getFeatured() {
    const params = {
      populate: {
        Featured: {
          populate: {
            tag: selectTag({ projectsCount: true }),
            tags: selectTag({ projectsCount: true }),
            image: {
              fields: ["id", "name", "url", "mime", "size"],
            },
          },
        },
      },
    };

    const result = await strapi.get("/category", {
      params,
      token: process.env.CATEGORY_TOKEN!,
    });

    return getCategoryFromStrapiDTO(result);
  }
};

const categoryRepository = categoryRepositoryFactory();

export default categoryRepository;
