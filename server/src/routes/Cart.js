const {Router}=require("express")
const {updateCartHandler, getCartByIdHandler}=require("../handlers/cartHandlers")
const cartRoutes=Router()

cartRoutes.put("/:id_cart", updateCartHandler)
          .get("/:id_cart", getCartByIdHandler)
          
module.exports=cartRoutes