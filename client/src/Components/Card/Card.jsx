import { useEffect } from 'react';
import Style from './Card.module.css'
import { useNavigate } from 'react-router-dom';
import { useGetAllFavProductsQuery, useGetFavProductQuery, 
  useAddFavProductMutation, useRemoveFavProductMutation } from '../../libs/redux/services/favoritesApi'
import { Card as AndCard, Rate, Button, Result } from 'antd';
const { Meta } = AndCard;
import { ShoppingCartOutlined, HeartOutlined, HeartFilled, } from '@ant-design/icons';
import { addProductCart } from '../../libs/redux/features/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { usePutCartMutation } from '../../libs/redux/services/CartApi';
import { useAuth } from '../../firebase/authContext';
import Swal from "sweetalert2/dist/sweetalert2.js"

const Card = (props) => {

  const {user}=useAuth()

  const dispatch=useDispatch()
  const navigate = useNavigate();
  const cartData=useSelector((state)=>state.cart)
  const id_cart=useSelector((state)=>state.user.userCartId)
  const currentUser= useSelector((state)=>state.user.userLog)
  const userId =  currentUser?.uid;
  
  const productId = props.id;
  const [ addFavProduct ] = useAddFavProductMutation();
  const [ removeFavProduct ] = useRemoveFavProductMutation();
  const { data: productFav, refetch  } = useGetFavProductQuery({userId, productId});
  const { refetch: refresh  } = useGetAllFavProductsQuery(userId);
  const [mutate]=usePutCartMutation()
  

  useEffect(() => {
    if (userId) {
        refetch();
    }
},[productFav, userId])

  const handlefavClick = async (event) => {
    event.stopPropagation();

    if(user===null){
      Swal.fire({
        title: "Debes loguearte para agregar productos al carrito",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      }).then((result)=>{
        if(result.isConfirmed){
          navigate(("/login"))
        }
      })
    }else{
      if (productFav) {
        await removeFavProduct({userId, productId});Swal.fire({
          position: "top-mid",
          icon: "success",
          title: `Se quito de favoritos` ,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        await addFavProduct({userId, productId});
        Swal.fire({
          position: "top-mid",
          icon: "success",
          title: `Agregado a favoritos` ,
          showConfirmButton: false,
          timer: 1500
        });
      }
      refetch(); 
      refresh();
    }
  }
  const CartNotification=()=>{
    if(user===null){
      Swal.fire({
        title: "Debes loguearte para agregar productos al carrito",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      }).then((result)=>{
        if(result.isConfirmed){
          navigate(("/login"))
        }
      })

    }else{
      Swal.fire({
        position: "top-mid",
        icon: "success",
        title: `Agregado al carrito` ,
        showConfirmButton: false,
        timer: 1500
      });
    }

  }
  const handleProductCart=async (product)=>{
    if(user===null){
      CartNotification(null)
    }else{
      dispatch(addProductCart(product))
      await mutate({ dataUpdate: cartData, id_cart: id_cart })
      CartNotification(product.name)
    }
  }

  return (
    <div className={Style.productList}>

        <AndCard
          className={Style.card}
          hoverable
          style={{ width: 280, height: 350}}
          cover={<img alt={props.name} src={props.image} style={{height: 200}} className={Style.img} />}>
          <Meta  onClick={()=>navigate(`/detail/${productId}`)} title={<p className={Style.name}>{props.name}</p>} />
          <Meta title={<div className={Style.raiting}><Rate disabled value={props.raiting}/></div>}
           description={<p className={Style.price}>${props.price}</p>} />
           <div className={Style.buttons}>
           <Button className={Style.button} onClick={()=>handleProductCart(props)}><ShoppingCartOutlined/></Button>
           <Button className={Style.button} onClick={handlefavClick}>{productFav?<HeartFilled/>:<HeartOutlined/>}</Button>
           </div>
        </AndCard>

    </div>
  )
}

export default Card;