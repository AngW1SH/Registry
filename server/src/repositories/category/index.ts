import { getCategoryFromStrapiDTO } from "@/db/strapi/adapters/category";
import { strapi } from "@/db/strapi/client";

const categoryRepositoryFactory = () => {
  return Object.freeze({ getFeatured });

  async function getFeatured() {
    const params = {
      populate: {
        Featured: {
          populate: {
            tag: true,
            tags: true,
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
