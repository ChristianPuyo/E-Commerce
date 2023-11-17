import React, { useEffect, useState } from 'react';
import { Table, Select } from 'antd';
import styles from "../UsersTable/UsersTable.module.css";
import { EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sumorder from './SumOrder';
import { useGetAllRequestQuery } from '../../../../libs/redux/services/requestApi';
import style from './class.module.css';

const OrderTable = () => {
  const { data } = useGetAllRequestQuery();
  const dispatch = useDispatch();
  const request = data ? Object.values(data) : [];
  const [filter, setFilter] = useState([])
  
  const columns = [
  {
    title: 'Pedidos',
    dataIndex: 'products',
    key: 'products',
    render: (products) => (
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <span>{product.name}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Cantidad',
    dataIndex: 'products',
    key: 'products',
    render: (products) => (
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <span>{product.quantity}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left',
    render: (status, record) => (
      <div>
        {status}
        <Link to={`/editRequest/${record.id_request}`}>
          <EditOutlined className={styles.marginIcon} />
        </Link>
      </div>
    ),
  },
  {
    title: 'Dirección',
    dataIndex: 'address',
    key: '2',
  }, 
  {
    title: 'Cliente',
    key: 'operation',
    fixed: 'right',
    render: (record) => (
      <div>
        <Link to={`/editUserAdmin/${record.uid}`}>
          <EditOutlined className={styles.marginIcon} />
        </Link>
      </div>
    ),
  },
];

const eventOnChange = (value) => {
    const orderProd = request.filter((ord) => ord.status === value)
    setFilter(orderProd)     
};

  return (
    <div className={styles.container} >
      <h1 className={styles.titleTable}>Lista de Pedidos</h1>
        <Sumorder/>

        <div className={style.selectContainer} >
          <Select 
          placeholder="Selecciona un estado"
          onChange={eventOnChange}>
            <Option value="">Todos</Option>
            <Option value="complete">Realizados</Option>
            <Option value="pending">Pendientes</Option>
            <Option value="cancelled">Cancelados</Option>
          </Select>
        </div>

      <br></br>
      
      <div style={{margin: "1% auto 5% auto"}}>
      <Table
      responsive
        className={styles.tableContainer}
        columns={columns}
        dataSource = {filter.length === 0 ? request : filter}
      />
      </div>
      
    </div>
  )


}; 
export default OrderTable; 