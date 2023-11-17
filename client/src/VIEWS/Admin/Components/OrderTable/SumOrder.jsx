import { useSelector } from 'react-redux';
import { useGetAllRequestQuery } from '../../../../libs/redux/services/requestApi';
import style from './class.module.css';
import { Row, Col } from 'antd';

const Sumorder = () => {
    const order = useSelector(state => state.request.allRequest);
    const { data } = useGetAllRequestQuery();
    const request = data ? Object.values(data) : [];
        
    

    const orderHistory = request.map((sol) => 
    sol.products ? sol.products.reduce((suma, producto) => suma + producto.quantity, 0) : 0
        )
    const sumQuantity = orderHistory.reduce((total, cantidad) => total + cantidad, 0);
    
    const BackOrders = request.map(sol => 
        sol.products ? sol.products
        .filter((prod) => sol.status === "pending")
        .reduce((suma, prod) => suma + prod.quantity, 0) : 0
        );

    const sumPending = BackOrders.reduce((total, cantidad) => total + cantidad, 0)

    const CancelledOrders = request.map(sol => 
        sol.products ? sol.products
        .filter((prod) => sol.status === "cancelled")
        .reduce((suma, prod) => suma + prod.quantity, 0) : 0
        );
    
    const sumCancelled = CancelledOrders.reduce((total, cantidad) => total + cantidad, 0)
    
    const PromotionalStock = sumCancelled;
    
    const OrdersPlaced = sumQuantity - (sumPending + sumCancelled)

    const totalOrders =  sumQuantity - OrdersPlaced
    
    
    return (
    
        <div className={style.div} >
            <ul className={style.ul}>
                <li className={style.li} >Pedidos realizados: {OrdersPlaced}</li>
                <li className={style.li} >Pedidos pendientes: {sumPending}</li>
                <li className={style.li} >Pedidos cancelados: {sumCancelled}</li>
                <li className={style.li} >Stock Promocional: {PromotionalStock}</li>
            </ul>
            
        <div className={style.ul}>
            <h3>Total de pedidos: {totalOrders} </h3>
            <h3>Historial de pedidos: {sumQuantity} </h3>
        </div>
            

            
        </div>
    )
}

export default Sumorder;