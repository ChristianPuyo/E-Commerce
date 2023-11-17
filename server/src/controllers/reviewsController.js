const { Review, Product } = require('../db');

//CONTROLER QUE TRAE REVIEWS DE UN PRODUCTO
const getReviewsController = async (productId) => {

  const review = await Review.findAll({ where: { id_product: productId } });
  if (review || review.length > 0) return review;
  else return [];
};

//CONTROLER QUE TRAE LA REVIEW DE UN PRODUCTO DE UN USUARIO
const getReviewByIdController = async (productId, idReview) => {

  const review = await Review.findOne({ where: {id_product: productId, id_review: idReview } });
  if (review !== null) return review;
  else return 'No se encontró ninguna reseña con ese ID';
};
//-----------------------------
//FUNCIÓN AUXILIAR PARA ACTUALIZAR EL RATING DE UN PRODUCTO
const updateProductRating = async (productId) => {
  const reviews = await getReviewsController(productId);
  let sum = 0;
  for (let i = 0; i < reviews.length; i++) {
    sum += reviews[i].rating;
  }
  const averageRating = reviews.length > 0 ? Math.round(sum / reviews.length) : 0;
  
  const product = await Product.findByPk(productId);
  product.rating = averageRating;
  await product.save();
}
//-----------------------------
//CONTROLLER QUE CREA UNA NUEVA REVIEW
const postReviewController = async (userId, productId, rating, comment) => {
    const reviewData = {
        uid: userId,
        id_product: productId,
        rating: rating,
        comment: comment,
      };
    const newRevew = await Review.create(reviewData);
    if (newRevew) {

      await updateProductRating(productId);
      return newRevew;
    }
    else return 'Hubo un problema al crear la review'
};

//CONTROLLER QUE EDITA UNA REVIEW
const updateReviewController = async (productId, idReview, rating, comment) => {
    const reviewData = {
        rating: rating,
        comment: comment,
    };
    const update = await Review.update(reviewData, { where: {id_review: idReview } });
    if (update) {

      await updateProductRating(productId);
      return await Review.findOne({ where: {id_product: productId, id_review: idReview } });
    } 
    else return 'Hubo un problema al actualizar';
};

//CONTROLLER QUE ELIMINA UNA REVIEW
const deleteReviewController = async (productId, idReview) => {

  const reviewDeleted = await Review.destroy({ where: {id_product: productId, id_review: idReview} });
  if (reviewDeleted) {

    await updateProductRating(productId);
    return `Review Eliminado con éxito`
  }
  else return 'Error al eliminar la review'
};

module.exports = {
    getReviewsController,
    getReviewByIdController,
    postReviewController,
    updateReviewController,
    deleteReviewController,
};
