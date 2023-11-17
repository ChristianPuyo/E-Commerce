import React from 'react'
import Conteiner from '../Style/Conteiners.module.css'

import NavBarAdmin from '../../Components/NavBarAdmin/NavBarAdmin';
import UsersTable from '../../Components/UsersTable/UsersTable';


const Clients = () => {
  return (
    <div className={Conteiner.Container}>
      <NavBarAdmin/>
      <div className={Conteiner.Panel}>
      <UsersTable/>
      </div>
    </div>
  )
}

export default Clients