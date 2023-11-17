import React from 'react'
import Conteiner from '../Style/Conteiners.module.css'

import NavBarAdmin from '../../Components/NavBarAdmin/NavBarAdmin';
import FormEditProduct from '../../Components/FormEditProduct/FormEditProduct';

const EditProducts = () => {
  return (
    <div className={Conteiner.Container}>
      <NavBarAdmin/>
      <div className={Conteiner.Panel}>
      <FormEditProduct/>
      </div>
    </div>
  )
}

export default EditProducts