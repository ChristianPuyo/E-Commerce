const { User, Cart, Request, Product, Payment } = require("../db");
const { Op } = require("sequelize");



//!CONTROLLER QUE TRAE TODOS LOS USUARIOS
const getAllUsersController=async()=>{
    const users=await User.findAll({
        include:[Cart, Request, Payment]
    })
    return users
}

const getUserByNameController = async (name)=>{
    const result = await User.findAll({
        where : {
            name: {[Op.iLike]: `%${name}%`}
        } 
    })
    return result
}

//!CONTROLLER QUE TRAE UN USUARIO MEDIANTE UN ID ESPECIFICO
const getUserIdController = async (id) => {
    const user = await User.findByPk(id, {
        include: [Cart, Request, Payment]
    });

    return user;
}

//Busca al user por el email
const getUserByEmail = async(email) =>{
    const user = await User.findOne({where:{email}})
    return user
}

//!el usuario se crea si el email no existe en la db
const createNewUserController = async (data) => {
    try {
        const [user, created] = await User.findOrCreate({
            where: {
                email: data.email
            },
            defaults: data,
        });

        if (created) {
            // Si el usuario es recién creado, también crea un carrito y asócialo
            const cart = await Cart.create();
            await user.setCart(cart);
        }

        return user;
    } catch (error) {
        throw error;
    }
};


//CONTROLLER QUE MODIFICA O ACTUALIZA UN USER
const putUserController = async (id, data) => {

    const findUserById = await User.findByPk(id);
    const updatedUser = await findUserById.update(data);

    return updatedUser;
}

const deleteUserController = async(id) =>{
    const findUserById = await User.findByPk(id);
    await findUserById.destroy();

    return findUserById;
}




module.exports = {
    getUserIdController,
    getAllUsersController,
    createNewUserController,
    putUserController,
    deleteUserController,
    getUserByEmail,
    getUserByNameController
};