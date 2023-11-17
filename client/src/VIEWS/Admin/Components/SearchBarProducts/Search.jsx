import styles from './SearchBarProducts.module.css';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useGetAllRequestQuery } from "../../../../libs/redux/services/requestApi";
import { Input, Space, List } from 'antd';

const Search = () => {
    const allRequests = useSelector(state => state.request);
    const { data } = useGetAllRequestQuery();
    const [input, setInput] = useState('');
    
    


    const handleChange = (e)=>{
        setInput(e.target.value)
    }

    // useEffect(()=>{
    //     data.filter(dom => dom.address === input)
    // }, [])
    
    return (
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
};

export default Search;