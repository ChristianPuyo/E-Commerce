import { useAuth } from "../../firebase/authContext"


const ProtectedView = ()=>{

    const {currentUser}= useAuth()
    
    return(<div>
        <h1>Protected View</h1>
    </div>)
}

export default ProtectedView