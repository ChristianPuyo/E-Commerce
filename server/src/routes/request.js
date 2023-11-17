const {Router}=require("express")
const { createRequestHandler, getAllRequestHandler, getRequestByIdHandler, putRequestByIdHandler, deleteRequestHandler } = require("../handlers/requestHandler")

const requestRouter=Router()

requestRouter.get("/", getAllRequestHandler)
requestRouter.post("/", createRequestHandler)
requestRouter.get("/:id_request", getRequestByIdHandler)
requestRouter.put("/:id_request", putRequestByIdHandler)
requestRouter.delete("/:id_request", deleteRequestHandler)

module.exports=requestRouter