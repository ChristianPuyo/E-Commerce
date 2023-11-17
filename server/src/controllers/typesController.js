const {Type, Product}=require("../db")

const getTypeController=async()=>{
    const types=await Type.findAll({
        include:Product
    })
    return types
}

module.exports={
    getTypeController
}