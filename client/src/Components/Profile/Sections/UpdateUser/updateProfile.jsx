import axios from "axios"
import { useEffect } from "react";
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../../../libs/redux/services/usersApi";
import { Form, Input, Button, Upload, Spin  } from 'antd';
import ImgCrop from 'antd-img-crop';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './updateProfile.module.css'
import { useTranslation } from 'react-i18next';

const UpdateProfile = () => {

    const { t  } = useTranslation("global");
    const [isEditing, setIsEditing] = useState(false);
    const user = useSelector(state => state.user.userLog)
    const id = user?.uid;

    const { data: getUserById, isLoading, refetch } = useGetUserByIdQuery(id);
    const [ updateUser ] = useUpdateUserMutation();

    const [ updateProfile, setUpdateProfile ] = useState({ image: ''
    , name: '', lastName: '', address: '',  phone: ''});

    // Cargo al estado con el usuario
    useEffect(() => {
        if (getUserById) {
            setUpdateProfile({
                image: getUserById.image, 
                name: getUserById.name, lastName: getUserById.lastName, address: user.address, 
                phone: getUserById.phone,
            });
        } 
    }, [getUserById]);

    useEffect(() => {
        setFileList([{ uid: '-1', name: 'image.png', status: 'done', url: updateProfile.image }]);
    }, [updateProfile.image]);

        //Carga de imagen
        const defaultFileList = [{ uid: '-1', name: 'image.png', status: 'done',
        url: updateProfile.image,},];
    
        const [fileList, setFileList] = useState(defaultFileList);

    const onChange = async ({  fileList: newFileList }) => {   
        if (newFileList.length === 0) {
            const defaultUrl = 'https://res.cloudinary.com/dkgeccpz4/image/upload/v1699475288/profileDefault_haxmxb.jpg';
            setFileList(defaultFileList.map(file => ({ ...file, url: defaultUrl })));
            setUpdateProfile({...updateProfile, image: defaultUrl});
        } else {
            setFileList([newFileList[newFileList.length - 1]]);
        }
    };
    
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    // Subida de imagen y actualización de la propiedad del estado
    const uploadImage = async ({ file, onSuccess, onError }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'Las Encinas Boutique');
      
            const response = await axios.post('https://api.cloudinary.com/v1_1/dkgeccpz4/image/upload', formData);
            const imageUrl = response.data.secure_url;

            setUpdateProfile({ ...updateProfile, image: imageUrl });
            setFileList([{ uid: '-1', name: 'image.png', status: 'done', url: imageUrl }]);
      
            onSuccess(null, file);
        } catch (error) {
            console.error('Error al cargar la imagen', error);
            onError(error);
        }
    };

    // Actualizacion estado
    const handleOnChange = (e) => {
        setUpdateProfile({
          ...updateProfile,
          [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
    const updateUserData = async () => {
    await updateUser({ id, updateProfile });
  };
    updateUserData();
    }, [updateProfile]);

    //Envío formulario
    const onFinish = async (values) => {
        
        const newProfile={ ...updateProfile, ...values };
        setUpdateProfile(newProfile);

        await updateUser({id, updateProfile});
        refetch();
    }
    

    const validateName = (rule, value) => {
        if (value && !/^[A-Z][a-z]*( [A-Z][a-z]*)?$/.test(value)) {
            return Promise.reject('Nombre inválido.');
        }
        return Promise.resolve();
    }

    const validatePhone = (rule, value) => {
        if (!/^\d{10}$/.test(value)) {
            return Promise.reject('Teléfono inválido.');
        }
        return Promise.resolve();
    }
    
    const validateAddress = (rule, value) => {
        if (!/^[A-Z][a-z]*[^.!]*$/.test(value)) {
            return Promise.reject('Dirección inválida.');
        }
        return Promise.resolve();
    }

    return(
        <div style={{}}>
            {isLoading || !user || !getUserById
            ? <Spin tip="Cargando" className={styles.loading}><div className="content"/></Spin>
            :<div>
                <div className={styles.uploadImage}>
                    <ImgCrop rotationSlider>
                        <Upload
                            customRequest={uploadImage}
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}>
                                {fileList.length < 2 && t("upProfile.Upload-image")}
                        </Upload>
                    </ImgCrop>
                </div>
                <Form
                    name="profile"
                    initialValues={getUserById}
                    onFinish={onFinish}>
                    <label>{t("upProfile.Name")}</label>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: t("upProfile.Enter-name") },
                            { validator: validateName, message: t("upProfile.Invalid-name") }]}>
                        <Input placeholder={t("upProfile.Name")} onChange={handleOnChange} value={updateProfile.name} 
                        readOnly={!isEditing}/>
                    </Form.Item>

                    <label>{t("upProfile.LastName")}</label>
                    <Form.Item
                        name="lastName"
                        rules={[{ required: true, message: t("upProfile.Enter-lastname")},
                            {validator: validateName, message: t("upProfile.Invalid-lastName") }]}>
                        <Input placeholder={t("upProfile.LastName")} onChange={handleOnChange} value={updateProfile.lastName} 
                        readOnly={!isEditing} />
                    </Form.Item>

                    <label>{t("upProfile.Phone")}</label>
                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: t("upProfile.Enter-phone")},
                            {validator: validatePhone, message: t("upProfile.Invalid-phone") }]}>
                        <Input placeholder={t("upProfile.Phone")} onChange={handleOnChange} value={updateProfile.phone} 
                        readOnly={!isEditing}/>
                    </Form.Item>

                    <label>{t("upProfile.Adress")}</label>
                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: t("upProfile.Enter-Adress")}, 
                            {validator:validateAddress, message: t("Invalid-adress")}]}>
                        <Input placeholder={t("upProfile.Adress")} onChange={handleOnChange} value={updateProfile.address} 
                        readOnly={!isEditing}/>
                    </Form.Item>

                    <Form.Item>
                        <Button onClick={() => setIsEditing(!isEditing)}>
                                {isEditing?<CloseOutlined/>:<EditOutlined/>}</Button>
                        {isEditing && <Button type="primary" htmlType="submit" className={styles.butonUpdateProfile}>
                        {t("upProfile.Update")}
                        </Button>}
                    </Form.Item>
                </Form>
            </div>
            }
        </div>
    );
}

export default UpdateProfile;