const { Router } = require("express");

const { putProduct,
        getProductById, 
        getAllProducts, 
        postProduct,
        deleteProduct,
        createPreference,
        patchProduct
      } = require("../handlers/productsHandlers");

const productsRouter = Router()


productsRouter.get("/", getAllProducts)
              .get("/:id", getProductById)
              .post("/", postProduct )
              .put("/:id", putProduct)
              .delete("/:id", deleteProduct)
              .post("/create_preference", createPreference)
              .patch("/:id", patchProduct)

module.exports= productsRouter;
