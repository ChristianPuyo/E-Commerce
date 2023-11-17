import { Layout, Row, Col } from 'antd';
const { Footer: AntFooter } = Layout;
import { FacebookOutlined, WhatsAppOutlined, InstagramOutlined, PhoneOutlined, PushpinOutlined } from '@ant-design/icons';
import styles from './footer.module.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t} = useTranslation("global");
    return(
        <Layout>
        <AntFooter className={styles.footer} style={{ textAlign: 'center'}}>
            <Row gutter={16}>
                <Col span={8}>
                    <h3 className={styles.titles}>{t("footer.Location")}</h3>
                    <p>San Miguel</p>
                    <p>de Tucumán <PushpinOutlined /></p>
                </Col>
                <Col span={8}>
                    <h3 className={styles.titles}>{t("footer.Social-Media")}</h3>
                    <a href='https://www.facebook.com/lasencinasboutique' className={styles.icons} target="_blank" rel="noopener noreferrer"><FacebookOutlined /></a>
                    <a href='https://www.instagram.com/pasteleria_lasencinas/' className={styles.icons} target="_blank" rel="noopener noreferrer"> <InstagramOutlined/></a>
                </Col>
                <Col span={8}>
                    <h3 className={styles.titles}>{t("footer.Contact")}</h3>
                    <p className={styles.titleContact}>E-mail: <a href='mailto:lasencinasboutique@gmail.com' className={styles.contact} target="_blank" rel="noopener noreferrer">lasencinasboutique@gmail.com</a></p>
                    <p className={styles.titleContact}>{t("footer.Phone")} <a href='tel:+541234567890' className={styles.contact}>+54 381 677-1213 <PhoneOutlined /></a></p>
                    <p className={styles.titleContact}><a href='https://wa.me/5493816683144' className={styles.contact} target="_blank" rel="noopener noreferrer">Whatsapp <WhatsAppOutlined /></a> </p>
                </Col>
            </Row> Copyright ©2023 {t("footer.Rights")}
        </AntFooter>
    </Layout>
    );
}
export default Footer;