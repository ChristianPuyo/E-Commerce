import { NavLink } from 'react-router-dom';
import { useSoftDeleteMutation } from '../../../../libs/redux/services/productsApi'
import { EditOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

const ActivateButton = ({ handleClick, isDelete }) => {
const buttonn = isDelete && <span onClick={handleClick}><CheckCircleOutlined key='activate' /></span>
return buttonn
}

const DeleteButton = ({ handleClick, isDelete }) => {
const buttonn = !isDelete && <span onClick={handleClick}><DeleteOutlined key='delete' /></span>
return buttonn
}

const CardAdmin = ({ image, name, description, id_product, is_Delete }) => {

const [softDelete] = useSoftDeleteMutation()
const descriptionEdit = description.slice(0, 35)

const handleDelete = () => {
const body = {
id_product: id_product,
is_Delete: true
}
softDelete(body)
}

const handleActivate = () => {
const body = {
id_product: id_product,
is_Delete: false
}
softDelete(body)
}

return (
    <div>
    <Card
        style={{
        margin: "5% 0 0 0",
        width: "18em",
        backgroundColor: is_Delete ? "#ffe6e6" : "white", // Fondo rojo claro si es eliminado
        color: is_Delete ? "darkred" : "black", // Texto oscuro si es eliminado
        boxShadow: is_Delete ? "0 0 10px rgba(255, 0, 0, 0.5)" : "none", // Sombra roja si es eliminado
        }}
        cover={
    <img
        alt={name}
        src={image}
        style={{
        width: "100%",
        height: "18em",
        position: "static",
        top: "0",
        left: "0"
        }}
    />
        }
        actions={[
    <ActivateButton handleClick={handleActivate} isDelete={is_Delete} />,
    <NavLink to={`/editProductAdmin/${id_product}`}><EditOutlined key="edit" /></NavLink >,
    <DeleteButton handleClick={handleDelete} isDelete={is_Delete} />
        ]}
        >
    <Meta
        style={{ minHeight: "6em" }}
        title={name}
        description={descriptionEdit + "..."}
    />
    </Card>
    </div>
    )
}

export default CardAdmin