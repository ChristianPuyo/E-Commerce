import { DatePicker, Button } from 'antd';
import styles from './Prueba.module.css'
const Prueba = ()=>{
    return(
        <div>
            <h1>Prueba</h1>
            <DatePicker />
            <Button type="primary" className={styles.button}>Hola Mundo</Button>
        </div>
    )
}

export default Prueba