import style from "./banner.module.css"
import bombones from "../../../public/bombones.png"
import combo from "../../../public/combo.png"
import huevos from "../../../public/huevos.png"
import pedido from "../../../public/pedido.png"
import Aos from "aos"
import "aos/dist/aos.css"
import { useTranslation } from "react-i18next";

import {useEffect} from "react"

const Banner = () => {

    const { t } = useTranslation("global");

    useEffect(()=>{
        Aos.init()
    }, [])

  return (
    <section className={style.bannerCont}>
        <h2 className={style.bannerTitle}>{t("banner.title")}</h2>
        <div className={style.bannerItemsCont}>

            {/*primer banner*/}

            <div data-aos="fade-right" className={style.itemCont}>
                <div className={style.imgCont}>
                    <img src={pedido}/>
                </div>
                <div className={style.textBanner}>
                    <h3>{t("banner.titledescription1")}</h3>
                    <p>{t("banner.description1")}</p>
                </div>
            </div>

            {/*segundo banner*/}
            
            <div data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" className={style.itemCont}>
                <div className={style.imgCont}>
                    <img src={combo}/>
                </div>
                <div className={style.textBanner}>
                    <h3>{t("banner.titledescription2")}</h3>
                    <p>{t("banner.description2")}</p>
                </div>
            </div>

            {/*tercer banner*/}
            
            <div data-aos="fade-right" data-aos-offset="500" data-aos-duration="500" className={style.itemCont}>
                <div className={style.imgCont}>
                    <img src={bombones}/>
                </div>
                <div className={style.textBanner}>
                    <h3>{t("banner.titledescription3")}</h3>
                    <p>{t("banner.description3")}</p>
                </div>
            </div>

            {/*cuarto banner*/}
            
            <div data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" className={style.itemCont}>
                <div className={style.imgCont}>
                    <img src={huevos}/>
                </div>
                <div className={style.textBanner}>
                    <h3>{t("banner.titledescription4")}</h3>
                    <p>{t("banner.description4")}</p>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Banner