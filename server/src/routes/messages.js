const { Router } = require("express")
const {
    postNewMessage,
    getAllMessages
} = require("../handlers/messagesHandlers")

const messagesRouter = Router()

messagesRouter.post("/", postNewMessage)
              .get("/", getAllMessages)


module.exports = messagesRouter;