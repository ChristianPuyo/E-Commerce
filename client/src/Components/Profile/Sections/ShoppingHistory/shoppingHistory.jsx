import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import { useGetAllRequestQuery } from '../../../../libs/redux/services/requestApi';
import RequestDetail from './RequestDetail/requestDetail';
import { Button, Tag, Table, Spin, Modal, Alert } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import styles from './shoppingHistory.module.css'
import { useTranslation } from 'react-i18next';

const ShoppingHistory = () => {

  const { t  } = useTranslation("global");
  const navigate = useNavigate();
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ currentRequest, setCurrentRequest ] = useState(null);

  const { data: requests, isLoading, refetch } = useGetAllRequestQuery();
  console.log(requests);

  useEffect(() => {
    if (!requests || requests === null || requests === undefined){
      refetch();
    }
  },[requests])

  const user = useSelector(state => state.user.userLog)
  const id = user?.uid;
  
  const userRequests = requests?.filter(request => request.uid === id);


  const seeDetail = (id_request) => {
    setIsModalVisible(true);
    setCurrentRequest(id_request);
  }

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: text => new Date(text).toLocaleDateString(),
    },
    {
      title: 'ID Pedido',
      dataIndex: 'id_request',
      key: 'id_request',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'complete' ? 'green' : 'volcano'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Producto(s)',
      dataIndex: 'products',
      key: 'products',
      render: products => products.map(product => product.name).join(', '),
    },
    {
      title: 'Cantidad',
      dataIndex: 'products',
      key: 'quantity',
      render: products => products.map(product => product.quantity).join(', '),
    },
    {
      title: 'Total',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: total_amount => `$ ${total_amount}`
    },
    {
      title: 'Detalles',
      key: 'actions',
      render: (text, record,) => (
        <Button type="primary" onClick={() => seeDetail(record.id_request)}>
          <EyeOutlined/>
        </Button>
      ),
    },
  ];
  
  return (
    <div className={styles.historyContainer}>
      {isLoading || !requests || requests===undefined || requests===null?
      <Spin tip="Cargando" className={styles.loading}><div className="content"/></Spin>
      :userRequests && userRequests.length > 0
      ? <div>
          <Table columns={columns} dataSource={userRequests} pagination={{ pageSize: 4 }}/>
          <div className={styles.modalContainer}>
            <Modal title="Detalles de la Compra" visible={isModalVisible} className={styles.modalDetail} width="80%" 
              footer={[
                <Button key="submit" type="primary" onClick={()=>setIsModalVisible(false)}>
                  Cerrar
                </Button>,]}
                onCancel={()=>setIsModalVisible(false)}> <RequestDetail id_request={currentRequest}/>
            </Modal>
          </div>
        </div>
      :<Alert message={t("shopping.NoPurchase")} type="info" showIcon
      description={
        <div>
            <p>{t("shopping.FirstPurchase")}</p>
            <Button type="primary" onClick={()=>navigate('/home')}>{t("shopping.Explore")}</Button>
        </div>}/>
      }
    </div>
  );
}

export default ShoppingHistory;