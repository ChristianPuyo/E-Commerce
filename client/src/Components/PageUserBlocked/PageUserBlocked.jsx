import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom'; 

const PageUserBlocked = () => {
    const navigate = useNavigate();
    return(
        <Result
        status="404"
        title="404"
        subTitle="Lo siento, su cuenta ha sido bloqueada."
        extra={<Button type="primary" onClick={()=> navigate('/home')}>Volver al inicio</Button>}
      />
    )
}

export default PageUserBlocked;