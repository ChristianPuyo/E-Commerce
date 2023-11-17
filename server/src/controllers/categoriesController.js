const {Category, Product}=require("../db")

const getCategoriesController=async()=>{
    const categories= await Category.findAll({
        include:Product
    })
    return categories
}

module.exports={
    getCategoriesController
}