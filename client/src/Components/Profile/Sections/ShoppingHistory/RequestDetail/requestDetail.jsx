import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetRequestByIdQuery } from '../../../../../libs/redux/services/requestApi';
import { Card, List, Descriptions, Spin } from 'antd';
const { Meta } = Card;
import styles from './requestDetail.module.css';

const RequestDetail = ({id_request}) => {

    const navigate = useNavigate();
    const { data: requestById, isLoading, refetch } = useGetRequestByIdQuery(id_request);

    useEffect(()=> {
        if (!requestById || requestById == null || requestById === undefined) {
            refetch();
        }
    },[requestById]);
console.log(requestById);

    return(
        <div className={styles.historyContainer}>
            {isLoading || !requestById || requestById == null || requestById === undefined
            ? <Spin tip="Cargando" className={styles.loading}><div className="content"/></Spin>
            :
            <div>
                <Descriptions  bordered className={styles.descriptions}>
                    <Descriptions.Item label="ID del Pedido">{requestById.id_request}</Descriptions.Item>
                    <Descriptions.Item label="Fecha">{new Date(requestById.date).toLocaleDateString()}</Descriptions.Item>
                    <Descriptions.Item label="Estado">{requestById.status}</Descriptions.Item>
                    <Descriptions.Item label="Dirección">{requestById.address}</Descriptions.Item>
                    <Descriptions.Item label="ID de Pago">{requestById.payment_id}</Descriptions.Item>
                    <Descriptions.Item label="Total">${requestById.total_amount}</Descriptions.Item>
                </Descriptions>
                <h3 className={styles.productsTitle}>Productos</h3>
                <List
                    grid={{ column: 1 }}
                    dataSource={requestById.products}
                    renderItem={item => (
                    <List.Item>
                        <Card
                            className={styles.productCard}
                            cover={<div className={styles.imageContainer}><img alt={item.title} src={item.image} className={styles.productImage} /></div>}
                            >
                            <Meta title={item.name} />
                            <p>Precio (unidad): ${item.price}</p>
                            <p>Cantidad: {item.quantity}</p>
                            <h4>Total: ${item.total_price}</h4>
                            <a className={styles.doReview} onClick={()=>navigate(`/detail/${item.id}`)}>Calificar</a>
                        </Card>
                    </List.Item>
                     )}
                />
            </div>}      
        </div>
    );
}

export default RequestDetail;