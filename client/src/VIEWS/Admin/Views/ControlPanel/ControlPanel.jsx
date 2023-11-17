import React, { useEffect, useState } from 'react';
import Style from './ControlPanel.module.css';
import Conteiner from '../Style/Conteiners.module.css';
import NavBarAdmin from '../../Components/NavBarAdmin/NavBarAdmin';
import CardAdmin from '../../Components/CardAdmin/CardAdmin';
import ChartLineAdmin from '../../Components/ChartJs/ChartLineAdmin';
import { useSelector } from 'react-redux';
import TextCardAdmin from '../../Components/TextCardAdmin/TextCardAdmin';
import { useAuth } from '../../../../firebase/authContext';
import { useGetAllRequestQuery } from '../../../../libs/redux/services/requestApi';

const ControlPanel = () => {
  const { user} = useAuth();
  const products = useSelector((state) => state.items.allProducts);
  const labels = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const dataVentas = labels.map(() => Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000);
  const dataPedidos = labels.map(() => Math.floor(Math.random() * (400 - 100 + 1)) + 100);

  const [mostrarGrafica1, setMostrarGrafica1] = useState(true);

  const toggleGrafica = () => {
    setMostrarGrafica1(!mostrarGrafica1);
  };

// ZONA DE RENDERIZADO RESPONSIVE 

const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const { data } = useGetAllRequestQuery();
const request = data ? Object.values(data) : [];

const sumQuantity = request.reduce((total, sol) => 
  total + (sol.products ? sol.products.reduce((suma, producto) => suma + producto.quantity, 0) : 0), 0);

const sumPending = request.reduce((total, sol) => 
  total + (sol.products ? sol.products.reduce((suma, prod) => (sol.status === "pending" ? suma + prod.quantity : suma), 0) : 0), 0);

const sumCancelled = request.reduce((total, sol) => 
  total + (sol.products ? sol.products.reduce((suma, prod) => (sol.status === "cancelled" ? suma + prod.quantity : suma), 0) : 0), 0);

const totalOrders = sumQuantity - ((sumPending + sumCancelled));

  return (
    <div className={Conteiner.Container}>
      <NavBarAdmin />
      <div className={Conteiner.Panel}>
        <div className={Style.SubHeader}>
          <div className={Style.InfoCards}>
          <div className={Style.CardsInfo}>
              <TextCardAdmin name={"Venta mensual"} info={"$1.200.000"} to={"paymentsAdmin"} />
              <TextCardAdmin name={"Pedidos mesuales"} info={totalOrders} to={"ordersAdmin"}/>
              <TextCardAdmin name={"Productos activos"} info={"45"} to={"productsAdmin"}/>
            </div>
            <div className={Style.Grafics}>
              
              <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                <h3 className={Style.h31}>Graficas</h3>

                <span
                className={Style.SeeMoreText}
                onClick={toggleGrafica}
                 >
                {mostrarGrafica1 ? " Ver pedidos" : "Ver ventas"}
                </span>
              </div>
              

              <ChartLineAdmin
                labels={labels}
                data1={dataVentas}
                data2={dataPedidos}
                name1={"Ventas"}
                name2={"Pedidos"}
                mostrarGrafica1={mostrarGrafica1}
              />
            </div>
          </div>
          {windowWidth > 768 ? <div className={Style.BestCard}>
            <h2>Producto estrella ⭐</h2>
            <div>
              {products.slice(0, 1).map((p) => (
                <CardAdmin
                  key={p.name}
                  name={p.name}
                  image={p.image}
                  description={p.description}
                  id_product={p.id_product} 
                />
              ))}
            </div>
          </div> : <></>}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
