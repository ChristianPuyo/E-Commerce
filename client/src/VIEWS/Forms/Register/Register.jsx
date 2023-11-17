import { useState } from "react";
import { useAuth } from "../../../firebase/authContext";
import { useNavigate } from "react-router-dom";
import "../Login/login.css";


const Register = ()=>{
    
    const navigate = useNavigate()
    const [error, setError] = useState()

    const [user, setUser] = useState({
        email: "",
        password:"",
    })

    const {signup}= useAuth()
   
    
    const handleChange = ({target: {name, value}})=>{
        setUser({
            ...user,
            [name]: value

        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('')

            try {
                const userCredentials=await signup(user.email, user.password);
                const uid=userCredentials.user.uid
                // console.log("identificador del usuario",uid)
                navigate('/home')
            } catch (error) {
                // console.log(error.code)
                if(error.code === 'auth/invalid-email'){
                    setError("Correo electrónico inválido")

                }else if(error.code === 'auth/weak-password'){
                    setError("La constraseña debe tener al menos 6 caracteres")
                }else if(error.code === 'auth/email-already-in-use'){
                    setError("El correo electrónico ya está registrado!!!")
                }
                
            }
    }

    // console.log("email:",user.email)
    // console.log("password", user.password)
    return(
        <div>
            {error && <p>{error}</p>}
            {console.log("Contenido del error")}

            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <br></br>
                <input type="password" name="password" id="password" placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <br></br>

                <button className="button-submit">Register</button>
                
            </form>
        </div>
        
    )
}

export default Register;