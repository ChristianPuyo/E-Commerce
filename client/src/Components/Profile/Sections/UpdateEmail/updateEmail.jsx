import { getAuth, reauthenticateWithCredential, signOut, verifyBeforeUpdateEmail, EmailAuthProvider} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useGetUserByIdQuery ,useUpdateUserMutation } from "../../../../libs/redux/services/usersApi";
import { Form, Input, Button, Spin, Modal, Alert } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './updateEmail.module.css'
import { useTranslation } from 'react-i18next';

const FormUpdateEmail = () => {

    const { t  } = useTranslation("global");
    const navigate = useNavigate();
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const currentEmail = auth.currentUser.email;

    const [isEditing, setIsEditing] = useState(false);
    const user = useSelector(state => state.user.userLog)
    const id = user?.uid;
    const { data: getUserById, isLoading, isError, refetch } = useGetUserByIdQuery(id);
    const [ updateUser ] = useUpdateUserMutation();

    const [ updateProfile, setUpdateProfile ] = useState({email: '', image: '', name: '', lastName: '',
     address: '',  phone: '', is_Admin: '', is_Delete: ''});

    useEffect(() => {
        if (getUserById) setUpdateProfile({email: getUserById.email, image: getUserById?.image, 
            name: getUserById.name, lastName: getUserById.lastName, address: user.address, phone: getUserById.phone,
            is_Admin: getUserById.is_Admin, is_Delete: getUserById.is_Delete
        });
        refetch();
    }, [getUserById, currentEmail]);

    // VERIFICACIÓN USUARIO
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Mensajes usuario
    const [successVisible, setSuccessVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    // Actualizacion estado
    const handleOnChange = (e) => {
        setUpdateProfile({
          ...updateProfile,
          email: e.target.value,
        });
    };
    
    useEffect(() => {
        const updateUserData = async () => {
        await updateUser({ id, updateProfile });
    };
        updateUserData();
    }, [updateProfile]);


    //Envío formulario
    const onFinish = async () => {

        setModalVisible(true);
    }

    const handleOk = async () => {

        const credential = EmailAuthProvider.credential(email, password);

        try {
            await reauthenticateWithCredential(currentUser, credential);
            console.log('Usuario reautenticado exitosamente');
    
        } catch (error) {
            console.error('Error al reautenticar el email', error);
            setErrorVisible(true);
            setModalVisible(false);
            return;
        }

        try {
            await verifyBeforeUpdateEmail(currentUser, updateProfile.email);
            await updateUser({id, updateProfile});
            refetch();
            setSuccessVisible(true);
            console.log('Correo electrónico actualizado exitosamente');

        } catch (error) {
            console.error('Error al actualizar el correo electrónico', error);
            setErrorVisible(true);
            setModalVisible(false);
            return;
        }
        setModalVisible(false);
    }

    const handleCancel = () => {
        setModalVisible(false);
    }
    
    const handleSuccessOk = () => {
        setSuccessVisible(false);
        signOut(auth);
        navigate('/login');
    }

    const handleErrorOk = () => {
        setErrorVisible(false);
    }
    
    const validateEmail = (rule, value) => {
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
            return Promise.reject('El correo electrónico no es válido.');
        }
        return Promise.resolve();
    }
    
    return(
        <div>
            {isLoading 
            ? <Spin tip="Cargando" className={styles.loading}><div className="content"/></Spin>
            : isError || !user || !getUserById 
            ? <Alert message="info" description="Por favor, intente de nuevo más tarde." type="error" 
            showIcon className={styles}/>
            : 
            <div>
                <Form                 
                    name="UpdateEmail"
                    initialValues={getUserById}
                    onFinish={onFinish}>

                    <label>{isEditing ? t("security.changeEmail"):t("security.E-mail")}</label>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: t("security.InsertEmail")}, 
                            {validator: validateEmail, message: t("security.InvalidEmail")}]}>
                        <div className={styles.inputGroup}>
                            <Input placeholder={t("security.E-mail")} onChange={handleOnChange} readOnly={!isEditing}
                            value={updateProfile.email} />
                            <Button onClick={() => setIsEditing(!isEditing)}>
                                {isEditing?<CloseOutlined/>:<EditOutlined/>}</Button>
                            {isEditing && 
                            <Button type="primary" htmlType="submit" className={styles.butonUpdateProfile}>
                                {t("security.Update")}
                            </Button>}
                        </div>
                    </Form.Item>
                </Form>
                <Modal title={t("security.EnterCredentials")} visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Input placeholder={t("security.E-mail")} onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder={t("security.Password")} type="password" onChange={(e) => setPassword(e.target.value)} />
                </Modal>
                <Modal title={t("security.SuccefullyEmail")} visible={successVisible} onOk={handleSuccessOk} closable={false}
                  footer={[
                    <Button key="submit" type="primary" onClick={handleSuccessOk}>
                      {t("security.Accept")}
                    </Button>,]}>
                    <p>{t("security.EmailReview")}</p>
                    <p>{t("security.EmailNewSession")}</p>
                </Modal>
                <Modal title="Error" visible={errorVisible} onOk={handleErrorOk} closable={false}
                    footer={[
                        <Button key="submit" type="primary" onClick={handleErrorOk}>
                            {t("security.Accept")}
                        </Button>,]}>
                    <p>{t("security.EmailError")}</p>
                </Modal>
            </div>}
        </div>
    );
    
}

export default FormUpdateEmail;