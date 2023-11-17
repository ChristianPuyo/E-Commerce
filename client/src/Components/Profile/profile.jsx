import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useGetUserByIdQuery } from "../../libs/redux/services/usersApi";
import ShoppingHistory from "./Sections/ShoppingHistory/shoppingHistory";
import FormUpdateEmail from "./Sections/UpdateEmail/updateEmail";
import FormUpdatePassword from "./Sections/UpdatePassword/updatePassword";
import UpdateProfile from "./Sections/UpdateUser/updateProfile";
import { Card, Spin, Tabs, Alert, Button } from 'antd';
const { TabPane } = Tabs;
import styles from './profile.module.css'
import { useTranslation } from 'react-i18next';

const Profile = () => {

    const navigate = useNavigate();
    const user = useSelector(state => state.user.userLog)
    const id = user?.uid;
    const { t  } = useTranslation("global");
    const { data: getUserById, isLoading, isError, refetch } = useGetUserByIdQuery(id);
    
    return(
        <div className={styles.profileContainer}>
            {isLoading 
            ? <Spin tip={t("profileMain.Loading")} className={styles.loading}><div className="content"/></Spin>
            : isError ?
            <Alert message="Error al cargar datos" description={<div>
                <p>Hubo un problema al cargar los datos, por favor intenta de nuevo más tarde.</p>
                <Button type='primary' onClick={()=>navigate('/home')}>Página principal</Button>
            </div>} type="error" 
            showIcon className={styles.alert}/> 
            : !getUserById || !user?
            <Alert message={t("profileMain.UserInformation")} description={<div>
                <p>{t("profileMain.PleaseLogin")}</p>
                <Button type='primary' onClick={()=>navigate('/login')}>{t("menu.Log-in")}</Button>
            </div>} type="info" 
            showIcon className={styles.alert}/> 
            :<div>
                <Card className={styles.userCard}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={t("profileMain.Basic Information")} key="1">
                            <UpdateProfile/>
                        </TabPane>
                        <TabPane tab={t("profileMain.Security")} key="2">
                            <FormUpdateEmail/>
                            <FormUpdatePassword/>
                        </TabPane>
                        <TabPane tab={t("profileMain.Shopping")} key="3">
                            <ShoppingHistory/>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>}
        </div>
    );
}

export default Profile;