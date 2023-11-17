import { Select, Space } from 'antd';
import style from "../Filters.module.css";

const Status = ({change, width}) => {
   
    return (
        <Space wrap className={style.selectCont}>
            <label htmlFor='status'>Estado del producto</label>
            <Select
                name="status"
                defaultValue={"Todos"}
                style={{
                    width: width,
                }}
                onChange={change}
                options={[
                    {
                        value: 'Todos',
                        label: 'Todos',
                    },
                    {
                        value: true,
                        label: 'No disponible',
                    },
                    {
                        value: false,
                        label: 'Disponible',
                    }]}
            />
        </Space>
    )
}

export default Status;