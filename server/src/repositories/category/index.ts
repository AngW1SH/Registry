import { getCategoryFromStrapiDTO } from "@/db/strapi/adapters/category";
import { strapi } from "@/db/strapi/client";
import { selectTag } from "@/db/strapi/queries/tag";
import { ServerError } from "@/helpers/errors";

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

    if (!result) throw new ServerError("Couldn't fetch featured categories");

    return getCategoryFromStrapiDTO(result);
  }
};

const categoryRepository = categoryRepositoryFactory();

export default categoryRepository;
