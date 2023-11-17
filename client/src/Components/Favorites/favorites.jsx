import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import { useGetAllFavProductsQuery } from "../../libs/redux/services/favoritesApi"
import styles from './favorites.module.css'
import { Alert, Button, Spin } from 'antd';

const Favorites = () => {

    const navigate = useNavigate();
    const user = useSelector(state => state.user.userLog)
    const userId = user.uid;
    const { data: getAllFavProducts, isError, isLoading, refetch } = useGetAllFavProductsQuery(userId);

    useEffect(() => {
        if (userId) {
            refetch();
        }
    },[getAllFavProducts, userId])

    return(
        <div className={styles.container}>
            { !userId? <Alert message="Por favor, inicie sesión para ver sus favoritos."
                type="info"
                description={
                    <div>
                        <p>Debes iniciar sesión para ver tus productos favoritos.</p>
                        <Button type="primary" onClick={()=>navigate('/login')}>Iniciar sesión</Button>
                    </div>
                }
                showIcon
                className={styles.alert}/>
            : isLoading? <Spin tip="Cargando" className={styles.alert}><div className="content"/></Spin>  
            : isError ? <Alert message="Error" description="Por favor, intente de nuevo más tarde." type="error" showIcon className={styles.alert}/>
            :Array.isArray(getAllFavProducts) && getAllFavProducts.length > 0 ?
                getAllFavProducts.map(props => (
                            <div key={props.id_product}>
                              <Card key={props.id_product}
                                id={props.id_product}
                                name={props.name}
                                price={props.price}
                                image={props.image}
                                raiting={props.raiting}
                                type={props.type} />
                            </div>
                          ))
            :
                <Alert message="¡Tu lista de favoritos está vacía!"
                type="info"
                description={
                    <div>
                        <p>Explora y encuentra tus productos preferidos para agregarlos a tu lista.</p>
                        <Button type="primary" onClick={()=>navigate('/home')}>Ver Productos</Button>
                    </div>
                }
                showIcon
                className={styles.alert}/>
            }
        </div>
    );
}

export default Favorites;