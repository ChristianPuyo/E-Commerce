import React, { useEffect, useState } from 'react';
import Style from './NavBarAdmin.module.css';
import { NavLink } from "react-router-dom"

import { ControlOutlined, HomeOutlined, ShoppingOutlined, UserOutlined, ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';

import icon from '../../../../assets/Las_encinas_Logo.png';

import { useGetAllProductsQuery } from '../../../../libs/redux/services/productsApi';
import { addProducts } from '../../../../libs/redux/features/productsSlice';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
  const dispatch = useDispatch();

  const filter = {
    category: "",
    maxPrice: "",
    minPrice: "",
    name: "",
    order: "",
    type: ""
  };

  const { data } = useGetAllProductsQuery(filter);

  useEffect(() => {
    dispatch(addProducts(data));
  }, [data]);

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

  return (
    <div className={Style.NavBar}>
      <img src={icon} alt="Las encinas boutic" />

      <ul className={Style.Items}>

        <li>
          <div className={Style.Item}>
            {windowWidth < 768 ? (
                <NavLink to={"/home"}><HomeOutlined style={{ marginRight: "5%", fontSize: '30px', color: 'white' }} /></NavLink>
            ) : (
              <>
                <HomeOutlined style={{ marginRight: "5%", fontSize: '30px', color: 'white' }} />
                <NavLink to={"/home"} className={Style.a}>Home</NavLink>
              </>
            )}
          </div>
        </li>

        <li>
          <div className={Style.Item}>
            {windowWidth < 768 ? (
                <NavLink to={"/controlAdmin"}><ControlOutlined style={{ fontSize: '30px', color: 'white' }} /></NavLink>
            ) : (
              <>
                <ControlOutlined style={{ fontSize: '30px', color: 'white' }} />
                <NavLink to={"/controlAdmin"} className={Style.a}>Panel de control</NavLink>
              </>
            )}
          </div>
        </li>

        <li>
          <div className={Style.Item}>
            {windowWidth < 768 ? (
              <NavLink to={"/productsAdmin"} ><ShoppingOutlined style={{ fontSize: '24px', color: 'white' }} /></NavLink>
            ) : (
              <>
                <ShoppingOutlined style={{ fontSize: '24px', color: 'white' }} />
                <NavLink to={"/productsAdmin"} className={Style.a}>Productos</NavLink>
              </>
            )}
          </div>
        </li>

        <li>
          <div className={Style.Item}>
            {windowWidth < 768 ? (
                <NavLink to={"/ordersAdmin"}><ShoppingCartOutlined style={{ marginRight: "5%", fontSize: '24px', color: 'white' }} /></NavLink>
            ) : (
              <>
                <ShoppingCartOutlined style={{ marginRight: "5%", fontSize: '24px', color: 'white' }} />
                <NavLink to={"/ordersAdmin"} className={Style.a}>Pedidos</NavLink>
              </>
            )}
          </div>
        </li>

        <li>
          <div className={Style.Item}>
            {windowWidth < 768 ? (
              <NavLink to={"/clientsAdmin"}><UserOutlined style={{ fontSize: '24px', color: 'white' }} /></NavLink>
            ) : (
              <>
                <UserOutlined style={{ fontSize: '24px', color: 'white' }} />
                <NavLink to={"/clientsAdmin"} className={Style.a}>Clientes</NavLink>
              </>
            )}
          </div>
        </li>

        <li>
          <div className={Style.Item}>
            {windowWidth < 768 ? (
                <NavLink to={"/paymentsAdmin"}><DollarOutlined style={{ fontSize: '24px', color: 'white' }} /></NavLink>
            ) : (
              <>
                <DollarOutlined style={{ fontSize: '24px', color: 'white' }} />
                <NavLink to={"/paymentsAdmin"} className={Style.a}>Pagos</NavLink>
              </>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
