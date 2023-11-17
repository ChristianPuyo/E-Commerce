import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { useCreateUsersMutation } from '../../../libs/redux/services/usersApi';
import { Form, Input, Button, message } from 'antd';
import style from './user.module.css';
import { useAuth } from "../../../firebase/authContext";
import Validates from './validates';
import { sendEmailVerification, getAuth } from 'firebase/auth';



const FormUser = () => {
    const { Item } = Form
    const { Password } = Input;
    const userForm = useSelector(state => state.user)
    const {signup} = useAuth()
    const [mutate] = useCreateUsersMutation();
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        lastName: '',
        address: '',
        email: '',
        phone: 0,
        password: ''
    })

    let [error, setError] = useState();

    let [errors, setErrors] = useState({
        name: '',
        lastName: '',
        address: '',
        email: '',
        phone: '',
        password: ''
    })

    const [isFormValid, setIsFormValid] = useState(false);


    const handlerCange = (name, value) => {
        setForm({
            ...form,
            [name]: value
        });

        const newErrors = { ...errors };

        Validates({
            ...form,
            [name]: value
        },
            newErrors,
            setErrors
            );
            const hasErrors = Object.values(newErrors).some((error) => error !== '');
            setIsFormValid(!hasErrors);
    }
    const resetState = () => { 
        setForm({ 
            name: '',
            lastName: '',
            address: '',
            email: '',
            phone: '',
            password: ''
        });
    };

    const handlerSubmit = async (event) => {
        event.preventDefault();   
        if (
            !form.name ||
            !form.lastName ||
            !form.address ||
            !form.email ||
            !form.phone ||
            !form.password 
        ) {
            alert('Por favor complete todos los campos')
            return;
        }
        
        try {
           
           setError('')

                await signup(form.email, form.password, form.name, form.lastName, form.phone, form.address);
                const auth = getAuth();
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    //console.log("Email enviado!!!!")
                });
                navigate('/home')
                } catch (error) {
                // console.log(error.code)
                if(error.code === 'auth/invalid-email'){
                    setError("Correo electrónico inválido")
                } else if(error.code === 'auth/weak-password'){
                    setError("La constraseña debe tener al menos 6 caracteres")
                }else if(error.code === 'auth/email-already-in-use'){
                    setError("El correo electrónico ya está registrado!!!")
                }
                
        }
    };    
// console.log(form);
const formItemLayout = {
    labelCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 8,
      },
    },
    wapperCol: {
      xs: {
        span: 4,
      },
      sm: {
        span: 20,
      },
    },
  };
    return (

        <div className={style.formPage}>
            <form onSubmit={handlerSubmit}  className={style.form}>
            <div className={style.h1}>
            <h2>Registro de Usuario</h2>
            </div>
                <Form.Item label="Nombre" name="name" {...formItemLayout} rules={[{ marginTop: "5%", required: true, message: 'Ingrese su nombre'}]}>
                    <Input name="name" value={form.name} onChange={(e) => handlerCange('name', e.target.value)} />
                </Form.Item>
                {errors.name !== '' ? <span>{errors.name}</span> : ''}
                
                <Form.Item label="Apellido" name="lastName" {...formItemLayout} rules={[{ marginTop: "5%", required: true, message: 'Ingrese su apellido'}]}>
                    <Input name="lastName" value={form.lastName} onChange={(e) => handlerCange('lastName', e.target.value)} />
                </Form.Item>
                {errors.lastName !== '' ? <span>{errors.lastName}</span> : ''}
                
                <Form.Item label="Domicilio" name="address" {...formItemLayout} rules={[{ marginTop: "5%", required: true, message: 'Ingrese su domicilio'}]}>
                    <Input name="address" value={form.address} onChange={(e) => handlerCange('address', e.target.value)} />
                </Form.Item>
                {errors.address !== '' ? <span>{errors.address}</span> : ''}
                
                <Form.Item label="E-mail" name="email" {...formItemLayout} rules={[{ marginTop: "5%", required: true, message: 'Ingrese su e-mail'}]}>
                    <Input name="email" value={form.email} onChange={(e) => handlerCange('email', e.target.value)} />
                </Form.Item>
                {errors.email !== '' ? <span>{errors.email}</span> : ''}
                
                <Form.Item label="Teléfono" name="phone" {...formItemLayout} rules={[{ marginTop: "5%", required: true, message: 'Ingrese su contacto'}]}>
                    <Input name="phone" value={form.phone} onChange={(e) => handlerCange('phone', e.target.value)} />
                </Form.Item>
                {errors.phone !== '' ? <span>{errors.phone}</span> : ''}
                
                <Form.Item label="Contraseña" name="password" {...formItemLayout} rules={[{ marginTop: "5%", required: true, message: 'Ingrese su contraseña'}]}>
                    <Password name="password" value={form.password} onChange={(e) => handlerCange('password', e.target.value)} />
                </Form.Item>
                {errors.password !== '' ? <span>{errors.password}</span> : ''}
                
                    
                <Button type="primary" htmlType="submit" className={style.buttonSubmit} >Registrar</Button>
                <div className={style.divButtons}>
                </div>

            </form>
        </div>
        
    )
};

export default FormUser;