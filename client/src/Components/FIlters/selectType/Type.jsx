import { Select, Space } from 'antd';
import style from "../Filters.module.css"
import { useGetAllTypesQuery } from '../../../libs/redux/services/typesApi';
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from 'react';
import { addTypes } from '../../../libs/redux/features/typesSlice';
import { useTranslation } from 'react-i18next';

const Type = ({change, width}) => {
  const dispatch=useDispatch()
  const types=useSelector((state)=>state.types.allTypes)
  const {data}=useGetAllTypesQuery()  
  const { t } = useTranslation("global");

  useEffect(()=>{
    if(data && data.length>0){
      dispatch(addTypes(data))
    }
  }, [data])

  return (
    <Space wrap className={style.selectCont}>
        <label htmlFor='type'>{t("filters.Chocolate type")}</label>
        <Select
          name="type"
          defaultValue="Todos"
          style={{
            width: width,
          }}
          onChange={change}
          options={types?.map((type) => ({
            label: type.name,
            value: type.name==="Todos"?"":type.name
          }))}
        />
      </Space>
  )
}
export default Type