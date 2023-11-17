const {Request, User, Product}=require("../db")

const getAllRequestController=async()=>{
    const response=await Request.findAll()
    return response
}

const createRequestController=async(data, id_user)=>{

    console.log("esto llega al controller de la request", data, id_user)
    const newRequest=await Request.create(data)
    const user=await User.findByPk(id_user)
    if(user){
        await newRequest.setUser(user)
        await Promise.all(
            data.products.map(async ({ id }) => {
                const product = await Product.findByPk(id);
                console.log("producto", product)
                if (product) {
                    await product.addUser(user);
                }
            })
        );
    }
    return newRequest
}

module.exports={
    createRequestController,
    getAllRequestController
}