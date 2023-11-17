import React from 'react';
import Conteiner from '../Style/Conteiners.module.css';
import Style from './Payments.module.css';

import NavBarAdmin from '../../Components/NavBarAdmin/NavBarAdmin';

import { Table, Space, Flex } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useDeletePaymentMutation, useGetAllPaymentsQuery } from '../../../../libs/redux/services/paymentsApi';
import SearchBarProducts from '../../Components/SearchBarProducts/SearchBarProducts';
import { useSelector } from 'react-redux';

const { Column, ColumnGroup } = Table;

const Payments = () => {

  const filters = useSelector((state)=>state.filters)

  const { data, isLoading } = useGetAllPaymentsQuery(filters);
  const [mutate] = useDeletePaymentMutation();

  const handleDelete = async (id_payment) => {
    try {
      await mutate(id_payment);
    } catch (error) {
      alert(error)
    }
  };

  return (
    <div className={Conteiner.Container}>
      <NavBarAdmin />
      <div className={Conteiner.Panel} style={{ padding: 0 }}>
        <br/>
        <SearchBarProducts width={"30vh"} state={"param"} inputname={"nombre o id de pago"}/>

        <div style={{ margin: "4% 5% 0 5%" }}>
          <Table dataSource={data} loading={isLoading} style={{color: "red"}}>
            <ColumnGroup title="Usuario">
              <Column title="Nombre" dataIndex="user_name" key="user_name" />
              <Column title="Email" dataIndex="user_email" key="user_email" />
            </ColumnGroup>
            <ColumnGroup title="Pago">
              <Column title="Identificador" dataIndex="id_paymentMp" key="id_paymentMp" />
              <Column title="Total" dataIndex="total_amount" key="total_amount" />
            </ColumnGroup>
            <Column
              key="action"
              render={(record) => (
                <Space size="middle" onClick={() => handleDelete(record.id_payment)}>
                  <DeleteOutlined className={Style.IconDelete} />
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Payments;
