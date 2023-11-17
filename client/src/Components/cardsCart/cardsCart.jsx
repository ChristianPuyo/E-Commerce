import style from "./cardsCart.module.css"
import { DeleteFilled } from "@ant-design/icons"
const CardsCart = ({name, image, price, quantity, onDelete, decrement, increment}) => {
  return (
    <div className={style.cardCont}>
        <div className={style.title}>{name}</div>
        <div className={style.info}>
            <img src={image} className={style.img}/>
            <div className={style.incrementDecrement}>
              <button disabled={quantity===1} onClick={()=>decrement({name:name})}>-</button>
              <button disabled={quantity===10} onClick={()=>increment({name:name})}>+</button>
            </div>
            <p className={style.total}>{price} x {quantity}</p>
            <div>
              <button className={style.deleteButton} onClick={()=>onDelete({name:name, price:price, quantity:quantity})}><DeleteFilled className={style.delete}/></button>
            </div>
        </div>
    </div>
  )
}
export default CardsCart