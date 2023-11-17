import style from './App.module.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./VIEWS/Home/Home"
import Detail from './VIEWS/Detail/detail';
import NavBar from './Components/Navbar/NavBar';
import FormUser from './VIEWS/Forms/FormsUser/user';
import AboutUs from './VIEWS/AboutUs/aboutUs';
import ErrorPage from './Components/ErrorPage/errorPage';
import Footer from './Components/Footer/footer';
import Login from './VIEWS/Forms/Login/login';
import Favorites from './Components/Favorites/favorites';
import { AuthProvider } from './firebase/authContext';
import { ProtectedRoute } from './firebase/ProtectedRoute'; //Envuelve a rutas que necesitan autenticación
import FormResetPassword from './VIEWS/Forms/FormResetPassword/FormResetPassword';
import {Cart} from "./VIEWS/cart/Cart"
import Profile from './Components/Profile/profile';

//Admin
import ControlPanel from './VIEWS/Admin/Views/ControlPanel/ControlPanel';
import Products from './VIEWS/Admin/Views/Products/Products';
import Payments from './VIEWS/Admin/Views/Payments/Payments';
import Orders from './VIEWS/Admin/Views/Orders/Orders';
import Clients from './VIEWS/Admin/Views/Clients/Clients';
import EditUsers from './VIEWS/Admin/Views/Clients/EditUsers';
import EditProducts from './VIEWS/Admin/Views/Products/EditProducts'
import CreateProducts from './VIEWS/Admin/Views/Products/CreateProducts';
import { useSelector } from 'react-redux';
import PageUserBlocked from './Components/PageUserBlocked/PageUserBlocked';
import { useState } from 'react';
import Menu from './Components/menu/Menu'; 
import Chat from './VIEWS/Chat/Chat';
import Landing from './VIEWS/Landing/Landing';
import ContactUs from './VIEWS/Forms/FormContacts/ContactUs';
import EditRequest from './VIEWS/Admin/Components/FormEditRequest/FormEditRequest';

const App = () => {

  const [isOPen, setIsOpen]=useState(false)

  const currentUser = useSelector(state => state.user.userLog)
 
  const handleOPen=()=>{
    // console.log("hola perro!")
    setIsOpen(!isOPen)
  } 

  const location = useLocation();

  const validate =
  location.pathname !== '/' && 
  location.pathname !== '/controlAdmin' && 
  location.pathname !== '/productsAdmin' &&
  location.pathname !== '/paymentsAdmin' &&
  location.pathname !== '/clientsAdmin' &&
  location.pathname !== '/ordersAdmin' &&
  location.pathname !== '/createProduct' &&
  !location.pathname.startsWith('/editProductAdmin/') &&
  !location.pathname.startsWith('/editRequest/') &&
  location.pathname !== '/ordersAdmin' &&
  !location.pathname.startsWith('/editUserAdmin/')
  
  return (
    <main className={style.mainCont}>
      
      
      {/* AuthProvider es un contexto que permite saber cuando un usuario está logeado */}
      <AuthProvider>
        {validate && <NavBar handleOPen={handleOPen} isOPen={isOPen}/>}
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='detail/:id' element={<Detail />} />
          <Route path='registeruser' element={<FormUser />} />
          <Route path='homeblocked' element={<PageUserBlocked />} />
          <Route path="/contactUs" element={<ContactUs/>}/>
          {/* <Route path='about' element={<ProtectedRoute><AboutUs /></ProtectedRoute>} /> Este es un 
          ejemplo de como obligar al usuario a logearse. */}
          <Route path='*' element={<ErrorPage/>} />
          <Route path='about' element={<AboutUs />} />
          <Route path='login' element={<Login/>} />
          <Route path='resetpassword' element={<FormResetPassword />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/profile' element={<Profile user={currentUser}/>}/>
          {/* Rutas protegidas para el cliente, lo obligan a logearse */}
          <Route path='/chat' element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          {/* Rutas protegidas del admin */}
          {currentUser?.is_Admin === true ? <Route path='/controlAdmin' element={<ControlPanel />} /> : <Route path='/controlAdmin' element={<ErrorPage />} />}
          {currentUser?.is_Admin === true ? <Route path='/productsAdmin' element={<Products />} /> : <Route path='/productsAdmin' element={<ErrorPage />} />}
          {currentUser?.is_Admin === true ? <Route path='/paymentsAdmin' element={<Payments />} /> : <Route path='/paymentsAdmin' element={<ErrorPage />} />}
          {currentUser?.is_Admin === true ? <Route path='/ordersAdmin' element={<Orders />} /> : <Route path='/ordersAdmin' element={<ErrorPage />} />}
          {currentUser?.is_Admin === true ? <Route path='/clientsAdmin' element={<Clients />} /> : <Route path='/clientsAdmin' element={<ErrorPage />} />}
          {currentUser?.is_Admin === true ? <Route path='/editUserAdmin/:id' element={<EditUsers />} /> : <Route path='/editUserAdmin/:id' element={<ErrorPage />} />}
          {currentUser?.is_Admin === true ? <Route path='/editProductAdmin/:id' element={<EditProducts />} /> : <Route path='editProductAdmin/:id' element={<ErrorPage />} />}
          {currentUser?.is_Admin === true ? <Route path='/createProduct' element={<CreateProducts />} /> : <Route path='/createProduct' element={<ErrorPage />} />}
          {currentUser?.is_Admin === true ? <Route path='/editRequest/:id' element={<EditRequest />} /> : <Route path='/editRequest/:id' element={<ErrorPage />} />}
          {/* <Route path='/controlAdmin' element={currentUser?.is_Admin?<ControlPanel/>: <ErrorPage/>} /> */}
        </Routes>
        {isOPen&&<Menu handleOPen={handleOPen}/>}
        {validate && <Footer />}
      </AuthProvider>
     
       
    </main>
  )
}

export default App