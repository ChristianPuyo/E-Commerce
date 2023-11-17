const { getCategoriesController } = require("../controllers/categoriesController")


const getCategoriesHandler=async(req, res)=>{
    try {
        const response= await getCategoriesController()
        res.status(200).json(response)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports={
    getCategoriesHandler
}