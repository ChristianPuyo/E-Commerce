import style from "./SearchBarProducts.module.css"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { addFilter } from "../../../../libs/redux/features/filterSelice"
import { useLocalStorage } from "../../../../Hooks/useLocalStorage"

import { Input , Space } from 'antd';

const SearchBarProducts = ({width = "30vh", state = "name", inputname = "producto"}) => {

  const dispatch=useDispatch()

  const [name, setName]=useLocalStorage("")

  const [search, setSearch]=useState("")

  const handleChange=(event)=>{
    const {value}=event.target
    setName(value)
  }

  useEffect(() => {
    dispatch(addFilter({
        name:state,
        value:name
      }))
      setSearch(name)
  }, [name])

  console.log(inputname, state);

  return (
    <Space wrap className={style.selectCont}>
    <label htmlFor='searchProduct'>{`Buscar por ${inputname}`}</label>
        <Input
        placeholder={`Buscar por ${inputname}...`}
        name="search" 
        value={name} 
        onChange={handleChange}
        style={{
            width: width
          }}
        />
  </Space>
  )
}
export default SearchBarProducts;