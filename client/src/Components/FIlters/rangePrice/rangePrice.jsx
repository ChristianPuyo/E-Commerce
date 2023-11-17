import { InputNumber, Space } from 'antd';
import style from "../Filters.module.css"
import { useTranslation } from 'react-i18next';

export const RangePrice = ({changeMin, changeMax}) => {
    const { t } = useTranslation("global");
  return (
        <Space name="range price">
            <div className={style.selectCont}>
                <label htmlFor='min'>{t("filters.Minimum")}</label>
                <InputNumber
                name='min'
                min={0}
                max={1000000}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={changeMin}
                />
            </div>
            <div className={style.selectCont}>
                <label htmlFor='max'>{t("filters.Maximum")}</label>
                <InputNumber
                name='max'
                min={0}
                max={1000000}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={changeMax}
                />
            </div>
        </Space>

  )
}
export default RangePrice
