const {
    createNewMessageController,
    getAllMessagesController

} = require("../controllers/messageControllers")





const postNewMessage = async (req, res) =>{
    const {userName, text, timestamp, uid} = req.body
    try {
        const data = {
            userName,
            text, 
            timestamp,
            uid
        }
        const newMessage = await createNewMessageController(data)
        res.status(200).json(newMessage)

    } catch (error) {
       res.status(400).json({error: error.message}) 
    }
}

const getAllMessages = async ( req, res ) => {

    try {
        
        const result = await getAllMessagesController()
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

}

module.exports = {
    postNewMessage,
    getAllMessages
    
}