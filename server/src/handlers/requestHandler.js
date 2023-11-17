const {Request, user, products}=require("../db")
const {createRequestController, getAllRequestController, putRequestByIdController, getRequestByIdController, deleteRequestController}=require("../controllers/requestController")

const getAllRequestHandler=async(req, res)=>{
    try {
        const response=await getAllRequestController()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json(error)
    }
}
const createRequestHandler=async(req, res)=>{

    const {id_user, products, address, payment_id, total_amount }=req.body

    try {
        const existRequest=await Request.findOne({
            where:{
                payment_id:payment_id
            }
        })
        if(existRequest){
            const dataMessage={message:"ya existe una request con este id"}
            return res.status(201).json(dataMessage)
        }else{
            const date=new Date()

            const data={
                products:products,
                address:address,
                payment_id:payment_id,
                total_amount:total_amount,
                date:date
            }
            const response=await createRequestController(data, id_user)

            return res.status(201).json(response)
        }

    } catch (error) {

        return res.status(400).json(error)

    }
}
const getRequestByIdHandler=async(req, res)=>{
    const{id_request}=req.params

    try {
        
        const response= await getRequestByIdController(id_request)

        return res.status(200).json(response)

    } catch (error) {
        
        return res.status(400).json({message:error})

    }

}

const putRequestByIdHandler=async(req, res)=>{

    const {id_request}=req.params

    const {status}=req.body
    console.log('esto trae status', status);
    console.log('esto trae id', id_request);
    try {
        
        const data={
            status:status
        }

        const response=await putRequestByIdController(data, id_request)

        return res.status(200).json(response)

    } catch (error) {
        
        return res.status(400).json({message:error})

    }
}

const deleteRequestHandler=async(req, res)=>{
    
    const {id_request}=req.params

    try {
        
        const response=await deleteRequestController(id_request)

        return res.status(200).json(response)

    } catch (error) {
        
        return res.status(400).json({message:error})

    }

}

module.exports={
    createRequestHandler,
    getAllRequestHandler,
    getRequestByIdHandler,
    putRequestByIdHandler,
    deleteRequestHandler
}