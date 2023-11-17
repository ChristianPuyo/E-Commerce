import React from 'react'
import Conteiner from '../Style/Conteiners.module.css'

import NavBarAdmin from '../../Components/NavBarAdmin/NavBarAdmin';
import UsersTable from '../../Components/UsersTable/UsersTable';
import FormEditUser from '../../Components/FormEditUser/FormEditUser';


const EditUsers = () => {
  return (
    <div className={Conteiner.Container}>
      <NavBarAdmin/>
      <div className={Conteiner.Panel}>
      
      <FormEditUser/>
      </div>
    </div>
  )
}

export default EditUsers