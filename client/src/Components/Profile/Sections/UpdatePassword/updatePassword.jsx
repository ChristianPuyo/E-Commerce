import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider, signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './updatePassword.module.css'
import { useTranslation } from 'react-i18next';

const FormUpdatePassword = () => {
    
    const { t  } = useTranslation("global");
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const [modalVisible, setModalVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = async () => {
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
            await updatePassword(currentUser, newPassword);
            console.log('Contraseña actualizada exitosamente');
            setSuccessVisible(true);
        } catch (error) {
            console.error('Error al actualizar la contraseña', error);
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
        navigate('/login')
    }

    const handleErrorOk = () => {
        setErrorVisible(false);
    }

    return(
        <div>
            <div>
                <Form                 
                    name="UpdatePassword"
                    onFinish={handleSubmit}>

                    <label htmlFor="">{t("security.Password")}</label>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: t("security.InsertPass")}]}>
                        <div className={styles.inputGroup}>
                            <Input placeholder={t("security.Password")} type="password" onChange={handleChange} readOnly={!isEditing}
                                value={newPassword} />
                            <Button onClick={() => setIsEditing(!isEditing)}>
                                {isEditing?<CloseOutlined/>:<EditOutlined/>}
                            </Button>
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
                <Modal title="Éxito" visible={successVisible} onOk={handleSuccessOk} closable={false}
                    footer={[
                        <Button key="submit" type="primary" onClick={handleSuccessOk}>
                            {t("security.Accept")}
                        </Button>,
                    ]}>
                    <p>{t("security.SuccefullyPass")}</p>
                </Modal>
                <Modal title="Error" visible={errorVisible} onOk={handleErrorOk} closable={false}
                    footer={[
                        <Button key="submit" type="primary" onClick={handleErrorOk}>
                            {t("security.Accept")}
                        </Button>,
                    ]}>
                    <p>{t("security.PassError")}</p>
                </Modal>
            </div>
        </div>
    );
}

export default FormUpdatePassword;
