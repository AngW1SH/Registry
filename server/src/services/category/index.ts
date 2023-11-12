import categoryRepository from "@/repositories/category";

const categoryServiceFactory = () => {
  return Object.freeze({ getFeatured });

  async function getFeatured() {
    return categoryRepository.getFeatured();
  }
};

const categoryService = categoryServiceFactory();

export default categoryService;
