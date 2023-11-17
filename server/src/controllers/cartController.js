const {Cart}=require("../db")

const getCartByIdController=async (id_cart)=>{

    const cart=await Cart.findByPk(id_cart)

    if(!cart){
        return {
            message:"No hay carrito con ese id"
        }
    }

    return cart

}

const updateCartController=async(data, id_cart)=>{

    console.log("id desde el controller", id_cart)

    console.log("informacion de actualizacion", data)
    const cart=await Cart.findByPk(id_cart)

    await cart.update(data)

    return cart

}

module.exports={
    getCartByIdController,
    updateCartController
}