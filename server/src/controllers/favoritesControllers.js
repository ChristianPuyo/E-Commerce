const { Op } = require("sequelize");
const {Product, User}=require("../db")

//CONTROLER QUE TRAE PRODUCTOS FAVORITOS
const getFavsController = async (userId) => {
    const user = await User.findByPk(userId);

    if (user) {
        const favorites = await user.getProducts();
        if (favorites.length > 0) return favorites;
        else return [];
    }
    else return 'El usuario no está registrado';
}

//CONTROLER QUE TRAE PRODUCTO FAVORITO POR ID
const getFavByIdController = async (userId, productId) => {

        const user = await User.findByPk(userId);
        console.log(`CONTROLLER => userId:${userId}, productId:${productId}`);

        if (user) {
        const favorites = await user.getProducts();
        if (favorites.length > 0) {
            const product = favorites.find(favorite => favorite.id_product === productId);
            console.log(favorites);
            return product ? true : false;
        }
        else return false;
        } 
        else return 'El usuario no está registrado';
}

//CONTROLER QUE AGREGA UN PRODUCTO A FAVORITOS
const addFavController = async (userId, productId) => {
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (user && product) {
        await user.addProduct(product);
        return { message: 'Producto agregado a favoritos', product: product };
    }
}

//CONTROLER QUE ELIMINA UN PRODUCTO DE FAVORITOS
const removeFavController = async (userId, productId) => {
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (user && product) {
        await user.removeProduct(product);
        return { message: 'Producto removido de favoritos', product: product };
    }
}

module.exports = {
    getFavsController,
    getFavByIdController,
    addFavController,
    removeFavController,
};
