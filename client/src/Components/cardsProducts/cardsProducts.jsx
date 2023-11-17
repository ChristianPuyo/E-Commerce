import Card from "../Card/Card"
import style from "./cardsProducts.module.css"

export const CardsProducts = ({productsToDisplay, name}) => {
  return (
    <div className={style.cont}>
        <div className={style.alerts}>
            {name ? <p className={style.results}>Resultados de busqueda para {name}</p>:""}
            
        </div>
        <div className={style.cardsCont}>
            {productsToDisplay.length===0 ? <p className={style.empty}>No se encontraron productos</p>:""}
            {
                productsToDisplay?.map((product)=>{
                    return (
                        <Card
                            key={product.id_product}
                            id={product.id_product}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            raiting={product.raiting}
                            type={product.type}
                        />
                    )
                })
            }
        </div>
    </div>
  )
}
export default CardsProducts