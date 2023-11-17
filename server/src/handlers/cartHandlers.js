const {updateCartController, getCartByIdController}=require("../controllers/cartController")

const getCartByIdHandler=async (req, res)=>{

    try {

        const {id_cart}=req.params

        const response= await getCartByIdController(id_cart)

        return res.status(200).json(response)

    } catch (error) {
        
        return res.status(400).json(error)
    }
}

const updateCartHandler=async (req, res)=>{

    try {

        const {id_cart}=req.params

        const {products, product_quantity, total_price}=req.body
        
        const data={
            products:products,
            product_quantity:product_quantity,
            total_price:total_price
        }

        const response=await updateCartController(data, id_cart)

        return res.status(200).json(response)

    } catch (error) {

        return res.status(400).json(error)

    }
}

module.exports={
    getCartByIdHandler,
    updateCartHandler
}