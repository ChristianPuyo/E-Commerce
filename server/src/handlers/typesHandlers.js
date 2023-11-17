const { getTypeController } = require("../controllers/typesController")


const getTypesHandler=async (req, res)=>{
    try {
        const response=await getTypeController()
        return res.status(200).json(response)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports={
    getTypesHandler
}