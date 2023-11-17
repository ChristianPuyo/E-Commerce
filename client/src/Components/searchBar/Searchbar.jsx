import searchIcon from "../../assets/search.png"
import style from "./Searchbar.module.css"
import { useEffect, useState } from "react"
import { addProducts } from "../../libs/redux/features/productsSlice"
import { useDispatch, useSelector } from "react-redux"
import { useGetAllProductsQuery } from "../../libs/redux/services/productsApi"
import { addFilter } from "../../libs/redux/features/filterSelice"
import { useTranslation } from "react-i18next"

const Searchbar = () => {

  const { t } = useTranslation("global");


  const dispatch=useDispatch()

  const filter=useSelector((state)=>state.filters)

  const products=useSelector((state)=>state.items.allProducts)


  const [name, setName]=useState("")


  const [search, setSearch]=useState("")


  const {data, isLoading}=useGetAllProductsQuery(filter)


  const handleChange=(event)=>{
    const {value}=event.target
    setName(value)
  }


  const handleSearch=()=>{
    dispatch(addFilter({
      name:"name",
      value:name
    }))
    setSearch(name)
    setName("")
  }


  useEffect(()=>{
    dispatch(addProducts(data))
  }, [search, data])


  return (
    <div className={style.searchCont} id="products">
        {/*<div className={style.inputCont}>
          <input type="text" value={name} className={style.input} onChange={handleChange}/>
          <button className={style.button} onClick={handleSearch}><img src={searchIcon} className={style.img}/></button>
        </div>*/}
        <div className={style.searchbarCont}>
            <div className={style.searchBar}>
                <input type='text' placeholder={t("searchBar.Search-by-name")} name="search" value={name} onChange={handleChange}/>
                <button onClick={handleSearch}><img src={searchIcon}/></button>
            </div>
        </div>
    </div>
  )
}
export default Searchbar