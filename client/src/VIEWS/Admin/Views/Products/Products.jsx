import React, { useState } from 'react';
import NavBarAdmin from '../../Components/NavBarAdmin/NavBarAdmin';

import Conteiner from '../Style/Conteiners.module.css'
import Style from './Products.module.css';

import { NavLink } from 'react-router-dom';
import CardAdmin from '../../Components/CardAdmin/CardAdmin';
import { useSelector } from 'react-redux';
import FilterAdmin from '../../Components/FilterAdmin/FilterAdmin';
import { useGetAllProductsQuery } from '../../../../libs/redux/services/productsApi';


const Products = () => {

  const filters = useSelector((state)=>state.filters)

  const { data } = useGetAllProductsQuery(filters)

  const [showAll, setShowAll] = useState(false);       

  const handleClick = () => {
    setShowAll(!showAll);
  }
  const seeMoreText = showAll ? 'Ver menos...' : 'Ver más...';

  return (
    <div className={Conteiner.Container}>
      <NavBarAdmin />
      <div className={Conteiner.Panel}>
        <div className={Style.buttons}>
          <NavLink to="/createProduct" className={`${Style.button} ${Style.marron}`}>
            Crear producto
          </NavLink>
        </div>

        <FilterAdmin/>

        <div className={Style.Prod}>
            <h2>Productos</h2>
            <span onClick={handleClick} className={Style.SeeMoreText}>
            {seeMoreText}
            </span>
          </div>

        <div className={Style.Cards}>
          {showAll
            ? data?.map((p) => (
              <CardAdmin name={p.name} id_product={p.id_product} image={p.image} description={p.description}  is_Delete={p.is_Delete}/>
              ))
            : data?.slice(0, 8).map((p) => (
              <CardAdmin name={p.name} id_product={p.id_product} image={p.image} description={p.description}  is_Delete={p.is_Delete}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
