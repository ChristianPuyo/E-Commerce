const { Router } = require("express")
const { getUserById, 
        getAllUsers,
        postNewUser,
        putUser,
        deleteUser
      } = require("../handlers/usersHandlers")



const usersRouter = Router()

usersRouter.get("/", getAllUsers)
           .get("/:id", getUserById)
           .post("/", postNewUser)
           .put("/:id", putUser)
           .delete("/:id", deleteUser)

module.exports = usersRouter;
