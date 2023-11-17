const { Router } = require("express");

const { getProductReviews,
        postProductReview,
        editProductReview,
        removeproductReview
      } = require("../handlers/reviewsHandler");

const reviewsRouter = Router()


reviewsRouter.get("/:productId", getProductReviews)
              .post("/:productId" , postProductReview)
              .put("/:productId" , editProductReview)
              .delete("/:productId" , removeproductReview)

module.exports= reviewsRouter;
