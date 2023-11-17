import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userLog } from '../../libs/redux/features/userSlice';

const ErrorPage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Recuperar el usuario desde localStorage al cargar la página
    const storedUser = localStorage.getItem('userLog');

    if (storedUser) {
      dispatch(userLog(JSON.parse(storedUser)));
    }
  }, [dispatch]);

    const navigate = useNavigate();
    return(
        <Result
        status="404"
        title="404"
        subTitle="Lo siento, la página que visitaste no existe."
        extra={<Button type="primary" onClick={()=> navigate('/home')}>Volver al inicio</Button>}
      />
    )
}

export default ErrorPage;