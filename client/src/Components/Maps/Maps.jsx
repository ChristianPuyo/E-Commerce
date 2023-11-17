import { useEffect } from "react";
import style from "./Maps.module.css"
import { useTranslation } from "react-i18next";

function IniciarMap() {

  const { t } = useTranslation("global");

  useEffect(() => {
    const coord = { lat: -26.830462224358953, lng: -65.20385131873294 };
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 18,
      center: coord,
    });

    new window.google.maps.Marker({
      position: coord,
      map: map,
    });
  }, []);

  return (
    <div className={style.mapCont}>
      <h2 className={style.ubicationTitle}>{t("map.Title")}</h2>
      <div id="map"className={style.map}></div>
    </div>
  )
}

export default IniciarMap;
