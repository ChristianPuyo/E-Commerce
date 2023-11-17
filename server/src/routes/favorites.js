const { Router } = require("express");

const { getFavProducts,
        getFavProductsById,
        addFavProduct,
        removeFavProduct,
      } = require("../handlers/favoritesHandlers");

const favoritesRouter = Router()


favoritesRouter.get("/:userId", getFavProducts)
              .get("/:userId", getFavProductsById)
              .post("/:userId" , addFavProduct)
              .delete("/:userId" , removeFavProduct)

module.exports= favoritesRouter;
