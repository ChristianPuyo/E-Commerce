import React from 'react'
import Conteiner from '../Style/Conteiners.module.css'

import NavBarAdmin from '../../Components/NavBarAdmin/NavBarAdmin';
import FormCreateProduct from '../../Components/FormCreateProduct/FormCreateProduct';

const CreateProducts = () => {
  return (
    <div className={Conteiner.Container}>
      <NavBarAdmin/>
      <div className={Conteiner.Panel}>
      <FormCreateProduct/>
      </div>
    </div>
  )
}

export default CreateProducts