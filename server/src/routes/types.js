const {Router}=require("express")
const { getTypesHandler } = require("../handlers/typesHandlers")

const typesRouter=Router()

typesRouter.get("/", getTypesHandler)

module.exports=typesRouter