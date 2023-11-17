import "../FormContacts/ContactUs.css"
import { Form, Input, Button, Image, Col, Row } from 'antd'
const { TextArea } = Input;
import { useTranslation } from "react-i18next";

const ContactUs = () => {

    const { t } = useTranslation("global");

    const ChangeName = (e) => {
        if ((e.target.value).lenght > 12) {
            console.log("excede los 12 caracteres, ")
        }
    }
    return (
        <Form className="FormContactUs">
            <div>
                <h2>{t("contactUS.Description1")}</h2>
                <h3>{t("contactUS.Description2")}</h3>
                <Image className="ImageContact" src='.././public/Contact.avif' width={380} height={280} />
            </div>
            <div className="FormInto">
                <label >{t("contactUS.Name")}</label>
                <Input name="name"
                    placeholder={t("contactUS.NameHolder")}
                    style={{ width: 200, height: 35 }} />
                <label>{t("contactUS.E-mail")}</label>
                <Input placeholder={t("contactUS.E-mailHolder")}
                    style={{ width: 200, height: 35 }} />
                <label>{t("contactUS.Message")}</label>
                <TextArea placeholder={t("contactUS.MessageHolder")}
                    style={{ width: 200, height: 35 }} />
                <Button className="btnGoogleContact ">{t("contactUS.SendMessage")}</Button>
            </div>
        </Form>

    )
}

export default ContactUs;