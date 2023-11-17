import { useAuth } from "../../firebase/authContext.jsx"; //Esto sirve para la autenticación
import Map from "../../Components/Maps/Maps.jsx";
import Carousel from "../../Components/carousel/Carousel.jsx";
import styles from "./home.module.css";
import { useDispatch} from "react-redux";
import { WhatsAppOutlined, WechatOutlined } from "@ant-design/icons";
import { getUserLog } from "../../libs/redux/features/actions/userActions.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Products from "../../Components/products/products.jsx";
import Banner from "../../Components/infoProducts/banner.jsx";



const Home = () => {

  const { user} = useAuth();

  const dispatch = useDispatch();
  
  useEffect(()=>{

    user && dispatch(getUserLog(user.uid))

  },[])

  const whatsappLink = `https://wa.me/+5493816771213?text=Hola! Cómo te va? Me pasarías info por favor?`;  

  return (
    <div className={styles.homeContainer}>
      <Carousel />
      <Products/>
      <Banner/>
      <Map/>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <WhatsAppOutlined className={styles["whatsapp-icon"]} />
      </a>
      <Link to="/chat"><WechatOutlined className={styles.chatIcon} /></Link>
    </div>
  );
};

export default Home;

