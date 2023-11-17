const { getUserIdController, 
        getAllUsersController, 
        createNewUserController, 
        putUserController,
        deleteUserController,
        getUserByEmail,
        getUserByNameController
      } = require("../controllers/usersControllers");


//!HANDLER QUE MANEJA LA PETICION GET A /USERS, PARA TRAER TODOS LOS USUARIOS (SOLO LA VA A UTILIAR EL PERFIL DE ADMIN)
const getAllUsers=async (req, res)=>{
    const {email} = req.query
    const {name} = req.query

    try {
        if(email){
            const result = await getUserByEmail(email)
            return res.status(200).json(result)
        }else if(name){
            const result = await getUserByNameController(name)
            return res.status(200).json(result);
        }else{
            const result=await getAllUsersController()
            return res.status(200).json(result)
        }
        
    } catch (error) {
        return res.status(400).json({message:error})
    }
}

//!HANDLER QUE MANEJA LA PETICION GET A /USERS/:ID PARA TRAER UN USUARIO MEDIANTE UN ID ESPECIFICO
const getUserById = async ( req, res) => {

   const { id } = req.params
   console.log("Esto es el params")
   console.log(id)
   
   try {
        const result = await getUserIdController(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message });
}

}

//!HANDLER QUE MANEJA LOS ERRORES Y PETICION DE POST /USER
const postNewUser = async (req, res) => {
    const { uid, name, lastName, email, address, phone, is_Admin, isBlocked, image } = req.body;
    console.log("Esto es el body ->",req.body)
    try{
        const data={
            uid: uid,
            name:name,
            lastName:lastName,
            email:email,
            phone:phone,
            address:address,
            is_Admin:is_Admin,
            isBlocked: isBlocked,
            image:image,
        }
        
        const newUser = await createNewUserController(data);

        res.status(201).json(newUser);
        
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//HANDLER QUE MANEJA LA PETICIÓN PUT A /Users
const putUser = async(req, res) =>{
    const { id } = req.params;
    const { name, lastName, email, address, phone, is_Admin, isBlocked, image } = req.body;

    try {
        const data={
            name:name,
            lastName: lastName,
            email:email,
            address:address,
            phone:phone,
            is_Admin:is_Admin,
            isBlocked: isBlocked,
            image:image,
        }
        const result = await putUserController(id, data)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Handler que maneja la petición delete a /Users
const deleteUser = async(req, res) =>{
    const { id } = req.params;
    
    try {
        const result = await deleteUserController(id)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = {
    getUserById,
    getAllUsers,
    postNewUser,
    putUser,
    deleteUser
}
// if(
//     !uid || 
//     !name ||
//     !lastName ||
//     !email ||
//     !password ||
//     !address
// ) {
//     return res.status(400)
//     .json({error: "Todos los campos deben ser completados"})
// }