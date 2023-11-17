const {Router}=require("express")
const {getAllPaymentsHandler, getPaymentByIdHandler, deletePaymentHandler}=require("../handlers/paymentsHandler")
const paymentsRouter=Router()

paymentsRouter.get("/", getAllPaymentsHandler)
paymentsRouter.get("/:id_payment", getPaymentByIdHandler)
paymentsRouter.delete("/:id_payment", deletePaymentHandler)

module.exports=paymentsRouter