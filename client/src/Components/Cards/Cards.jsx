import Style from './Cards.module.css'
import Card from "../Card/Card"
import {useSelector} from "react-redux"
// import { useGetAllProductsQuery } from "../../libs/redux/services/productsApi"


const Cards = () => {

  // const { data: allProducts } = 
  const products=useSelector((state)=>state.items.allProducts)
  return (
    <div className={Style.Container}>
        {products?.map(prod => (
        <Card key={prod.id_product} props={prod}
        />))}
    </div> 
  )
}

export default Cards