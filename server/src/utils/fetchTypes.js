const { Type } = require("../db");

const types = [
  { name: "Todos" },
  { name: "Chocolate blanco" },
  { name: "Chocolate con leche" },
  { name: "Chocolate semi-amargo" },
];

const fetchTypes = async () => {
  try {
    for (const type of types) {

      const existingType = await Type.findOne({
        where: { name: type.name },
      });

      if (!existingType) {
        await Type.create(type);
      }
    }

    console.log("Tipos creados o verificados con éxito.");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchTypes;
