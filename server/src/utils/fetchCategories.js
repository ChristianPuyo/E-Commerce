const { Category } = require("../db");

const categories = [
  { name: "Todas" },
  { name: "Alfajores" },
  { name: "Baños de chocolate" },
  { name: "Bombones" },
  { name: "Bocaditos" },
  { name: "Chocolate en rama" },
  { name: "Huevos de Pascua" },
  { name: "Surtidos" },
  { name: "Tabletas rellenas" },
  { name: "Turrones" },
];

const fetchCategories = async () => {
  try {
    for (const category of categories) {

      const existingCategory = await Category.findOne({
        where: { name: category.name },
      });

      if (!existingCategory) {
        await Category.create(category);
      }
    }

    console.log("Categorías creadas o verificadas con éxito.");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchCategories;
