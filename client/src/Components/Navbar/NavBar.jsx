import style from "./NavBar.module.css";
// import style from "./menu.module.css";
import menuStyle from "./menu.module.css"
import { useAuth } from "../../firebase/authContext";
import { NavLink } from "react-router-dom";
import cartIcon from "../../assets/carrito.png";
import logo from "../../assets/Las_encinas_Logo.png";
import title from "../../assets/las_encinas_letras.png";
import langLogo from "../../assets/idiomas.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../libs/redux/features/userSlice";
import { useEffect, useState } from "react";
import { addCart, cleanCart } from "../../libs/redux/features/CartSlice";
import { getUserByUid } from "../../libs/redux/features/actions/userActions";
import { useTranslation} from "react-i18next";
import { useCreateRequestMutation } from "../../libs/redux/services/requestApi";
import Swal from 'sweetalert2/dist/sweetalert2.js'

const URL_SERVER = import.meta.env.VITE_URL_SERVER; 

const getUserById=async(id)=>{

  const responseUser=(await axios(`${URL_SERVER}/users/${id}`)).data
  const {id_Cart}=responseUser.Cart
  const responseCart=(await axios(`${URL_SERVER}/cart/${id_Cart}`)).data
  const response={
    user:responseUser,
    cart:responseCart
  }
  return response
}

const NavBar = ({handleOPen, isOPen}) => {

  const [mutate, {data, isLoading}]=useCreateRequestMutation()

  const [madeRequest, setMadeRequest]=useState(false)

  const [alert, setAlert]=useState(false)

  const url = new URL(window.location.href);

  let status=url.searchParams.get("status")

  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation("global");
  console.log("Este es el user cuando te logueas con google:", user)

 
  const dispatch = useDispatch();

  const cart=useSelector((state)=>state.cart)
  const totalItemsCart=useSelector((state)=>state.cart.product_quantity)
  const currentUser = useSelector(state => state.user.userLog)


  user && getUserByUid(user.uid)

  const handleOnClick = async () => {
    await logout();
  };

  if(madeRequest && data && !alert){
    if(!data?.message){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "La compra se realizo con exito",
        showConfirmButton: false,
        timer: 1500
      });
    }
    setAlert(true)
  }

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        const { uid } = user;
        try {
          const response = await getUserById(uid);
          dispatch(addUser(response.user));
          dispatch(addCart(response.cart));
          
        } catch (error) {
          console.error("Error al obtener datos del usuario", error);
        }
      }
    };

    getUserData();
  }, [dispatch, user]);

  

  useEffect(()=>{
    if(status==="approved" && currentUser && cart?.products.length!==0 && !madeRequest){
      const payment_id=url.searchParams.get("payment_id")
      mutate({
        payment_id:payment_id,
        id_user:currentUser.uid,
        products:cart.products,
        address:currentUser.address,
        total_amount:cart.total_price
      })
      dispatch(cleanCart())
      setMadeRequest(true)
      
    }

  },[currentUser])
  console.log("datos del usuario", currentUser)
  return (
    <nav className={style.navCont}>
        <div className={style.logCont}>
          <NavLink to='/home' className={style.navTittle}><h1>Las Encinas Boutique</h1></NavLink>   
        </div>
        <div className={`${style.navItems} ${style.withMargin}`}>
          <div className={style.navLinks}>
              {!user&&<p>{t("navBar.not-costumer-yet?")} <NavLink to={"/registeruser"} onClick={handleOnClick} className={style.item}>{t("navBar.Register")}</NavLink></p>}
              {(
                user
              &&
              <div className={style.userCont}>
                <img src={!user?.photoURL?currentUser?.image:user?.photoURL} className={style.imgUser}/>
                <p className={style.name}>{currentUser?.name || user?.displayName}</p>
              </div>
              )
              }
          </div>
          <NavLink to={"/cart"}>
            <div className={style.cartIconCont}>
              <img src={cartIcon} className={style.cartIcon}/>
              <p className={style.TotaItems}>{totalItemsCart}</p>
            </div>
          </NavLink>
        <div className={style.languageSelect}>
          <div>
        <img src={langLogo} className={style.idiomas}/>
          </div>
          <div>
        <select
          className={style.cssSelect}
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="zh">中國人</option>
          <option value="pt">português</option>
        </select>
          </div>
          <div className={menuStyle.menuCont}>
          <input
            type='checkbox'
            name="checkbox"
            checked={isOPen}
            id={menuStyle.checkbox}
          />
          <label htmlFor='checkbox' className={menuStyle.toggle} onClick={handleOPen}>
            <div className={menuStyle.bars} id={menuStyle.bar1}></div>
            <div className={menuStyle.bars} id={menuStyle.bar2}></div>
            <div className={menuStyle.bars} id={menuStyle.bar3}></div>
          </label>
        </div>
        </div>
    </div>

          
        
    </nav>
  );
};

export default NavBar;