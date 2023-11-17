const {getAllPaymentsController, getPaymentByIdController, deletePaymentController}=require("../controllers/paymentsController")

const getAllPaymentsHandler=async(req, res)=>{
    const { param }=req.query
    try {
        const response=await getAllPaymentsController(param)

        return res.status(200).json(response)

    } catch (error) {
        
        return res.status(400).json({message:error})

    }
}

const getPaymentByIdHandler=async(req, res)=>{

    const {id_payment}=req.params

    try {
        
        const response=await getPaymentByIdController(id_payment)

        return res.status(200).json(response)

    } catch (error) {
        
        return res.status(400).json({message:error})
        
    }
}

const deletePaymentHandler=async (req, res)=>{

    const {id_payment}=req.params

    try {
        
        const response=deletePaymentController(id_payment)

        return res.status(200).json(response)

    } catch (error) {
        
        return res.status(400).json({message:error})
        
    }
}

module.exports={
    getAllPaymentsHandler,
    getPaymentByIdHandler,
    deletePaymentHandler
}