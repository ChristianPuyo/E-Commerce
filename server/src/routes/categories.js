const {Router}=require("express")
const { getCategoriesHandler } = require("../handlers/catgoriesHandler")

const categoryRouter=Router()

categoryRouter.get("/", getCategoriesHandler)

module.exports=categoryRouter