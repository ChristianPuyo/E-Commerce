const { Message } = require("../db")


const createNewMessageController = async(data)=>{
    const newMessage = await Message.create(data)
  
    return newMessage

}

const getAllMessagesController = async()=>{
    const allMessages = await Message.findAll()
    return allMessages
}

module.exports = {
    createNewMessageController,
    getAllMessagesController
}