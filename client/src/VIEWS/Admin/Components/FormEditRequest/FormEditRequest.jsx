import axios from "axios"
import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from '../../Views/Style/Forms.module.css'
import Swal from 'sweetalert2';

import {useUpdateRequestMutation, useGetAllRequestQuery} from '../../../../libs/redux/services/requestApi'
import style from '../FormEditUser/FormEditUser.module.css';

import { Select } from 'antd';
const { Option } = Select;

import { async } from "@firebase/util";

const EditRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const { data } = useGetAllRequestQuery();
    const [mutate] = useUpdateRequestMutation();
  
    const [state, setState] = useState({status: ""});
  
    const eventOnChange = (value) => {
      setState({status:value});
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await mutate({ status: state, id_request: id });
        console.log(state);
        navigate("/ordersAdmin")
      } catch (error) {
        alert(error);
      }
    };
  
    const handleCancel = () => {
      navigate("/ordersAdmin");
    };
  
    console.log(state, id);
  
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Editar Estado</h1>
        <form>
          <Select
            placeholder="Selecciona un estado"
            onChange={eventOnChange}
            value={state.status}
            style={{ width: "30vw" }}
          >
            <Option value="complete">Realizados</Option>
            <Option value="pending">Pendientes</Option>
            <Option value="cancelled">Cancelados</Option>
          </Select>
          <button
            className={styles.buttonCancel}
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            className={styles.button}
            onClick={handleSubmit}
            type="submit"
          >
            Guardar
          </button>
        </form>
      </div>
    );
  };
  
  export default EditRequest;
  