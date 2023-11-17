import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../../../firebase/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserByUid, updateUserFromDB } from '../../../../libs/redux/features/actions/userActions';
import styles from './FormEditUser.module.css'; // Importa los estilos

const FormEditUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userForm = useSelector((state) => state.user);
  const userByUid = useSelector((state) => state.user.userByUid);
  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserByUid(id));
  }, [id, dispatch]);

  const [form, setForm] = useState({
    name: '',
    lastName: '',
    address: '',
    email: '',
    phone: '',
    is_Admin: '',
    isBlocked: ''

  });

  
  useEffect(() => {
    if (userByUid) {
      setForm(userByUid);
    }
  }, [userByUid]);

  const [errors, setErrors] = useState({
    name: '',
    lastName: '',
    address: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isBool = name === 'is_Admin';

    setForm((prevForm) => ({
      ...prevForm,
      [name]: isBool ? value === 'true' : value,
    }));

    const newErrors = { ...errors };

    // Validates(
    //   {
    //     ...form,
    //     [name]: value,
    //   },
    //   newErrors,
    //   setErrors
    // );
  };

  const resetState = () => {
    setForm({
      name: '',
      lastName: '',
      address: '',
      email: '',
      phone: '',
      
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrors('');

      dispatch(updateUserFromDB(id, form));
      navigate('/clientsAdmin');
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/invalid-email') {
        setErrors('Correo electrónico inválido');
      } else if (error.code === 'auth/weak-password') {
        setErrors('La contraseña debe tener al menos 6 caracteres');
      } else if (error.code === 'auth/email-already-in-use') {
        setErrors('El correo electrónico ya está registrado!!!');
      }
    }
  };

  const handleCancel = ()=>{
    navigate("/clientsAdmin");
  }

  return (  
    <div className={styles.container}>
      <h1 className={styles.title}>Editar usuario</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>Nombre</label>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name !== '' && <span className={styles.span}>{errors.name}</span>}

        <label className={styles.label}>Apellido</label>
        <input
          className={styles.input}
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
        />
        {errors.lastName !== '' && <span className={styles.span}>{errors.lastName}</span>}

        <label className={styles.label}>Domicilio</label>
        <input
          className={styles.input}
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        {errors.address !== '' && <span className={styles.span}>{errors.address}</span>}

        <label className={styles.label}>E-mail</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          disabled
        />
        {errors.email !== '' && <span className={styles.span}>{errors.email}</span>}

        <label className={styles.label}>Teléfono</label>
        <input
          className={styles.input}
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone !== '' && <span className={styles.span}>{errors.phone}</span>}

        <label className={styles.label}>Tipo de usuario</label>
        <select
          className={styles.select}
          name="is_Admin"
          value={form.is_Admin}
          onChange={handleChange}
        >
          <option value={true}>Administrador</option>
          <option value={false}>Cliente</option>
        </select>

        <label className={styles.label}>Bloquear usuario</label>
        <select
          className={styles.select}
          name="isBlocked"
          value={form.isBlocked}
          onChange={handleChange}
        >
          <option value={true}>Si</option>
          <option value={false}>No</option>
        </select>

       
        <button className={styles.buttonCancel} onClick={handleCancel}>Cancelar</button>
        <button className={styles.button} type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FormEditUser;



