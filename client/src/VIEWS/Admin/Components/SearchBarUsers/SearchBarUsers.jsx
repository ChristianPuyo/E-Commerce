import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usersByName } from "../../../../libs/redux/features/actions/userActions";
import styles from './SearchBarUsers.module.css'

const SearchBarUsers =()=>{
    const dispatch = useDispatch()
    const [input, setInput] =useState('')

  useEffect(() => {

    dispatch(usersByName(input))
  }, [input])

    const handleChange = (e)=>{
        setInput(e.target.value)
    }
    
    return(
        <div>
            <input
            className={styles.searchBar} 
            type="text"
            placeholder='Buscar por nombre'
            value={input}
            onChange={handleChange}
            />
            
        </div>
    )

}

export default SearchBarUsers;
