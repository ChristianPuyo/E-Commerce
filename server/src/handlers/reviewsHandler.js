const { 
    getReviewsController,
    getReviewByIdController,
    postReviewController,
    updateReviewController,
    deleteReviewController,
  } = require("../controllers/reviewsController");


//-----------------------------------
// Handler GET /reviews
const getProductReviews = async (req, res) => {
const { productId } = req.params;
const { idReview } = req.query;

try {
    const reviews = idReview? await getReviewByIdController(productId, idReview) :  await getReviewsController(productId);
    res.status(201).json(reviews)
} catch (error) {
    res.status(400).json({ error: error.message });
}
}

//Handler que maneja la petición POST a /reviews
const postProductReview = async(req, res) =>{
    const { productId } = req.params;
    const { userId } = req.query;
    const { rating, comment } = req.body;

try {
    const review = await postReviewController(userId, productId, rating, comment)
    res.status(201).json(review)
} catch (error) {
    res.status(400).json({ error: error.message });
}
}

//Handler que maneja la petición PUT a /reviews
const editProductReview = async(req, res) =>{
    const { productId } = req.params;
    const { idReview } = req.query;
    const { rating, comment } = req.body;

try {
    const review = await updateReviewController(productId, idReview, rating, comment)
    res.status(201).json(review)
} catch (error) {
    res.status(400).json({ error: error.message });
}
}

//Handler que maneja la petición DELETE a /review
const removeproductReview = async(req, res) =>{
    const { productId } = req.params;
    const { idReview } = req.query;

try {
    const review = await deleteReviewController(productId, idReview)
    res.status(200).json(review)
} catch (error) {
    res.status(400).json({ error: error.message });
}
}

module.exports = {
getProductReviews,
postProductReview,
editProductReview,
removeproductReview
}