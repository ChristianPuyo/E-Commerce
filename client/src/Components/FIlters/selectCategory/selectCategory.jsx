import { Select, Space } from 'antd';
import style from "../Filters.module.css"
import { useSelector, useDispatch} from "react-redux";
import { useGetAllCategoriesQuery } from "../../../libs/redux/services/categoriesApi";
import { addCategories } from "../../../libs/redux/features/categoriesSlice";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SelectCategory = ({change, width}) => {

  const { t } = useTranslation("global");
  
  const dispatch=useDispatch()

  const categories=useSelector((state)=>state.categories.allCategories)

  const {data}=useGetAllCategoriesQuery()  

  useEffect(()=>{
    if(data && data.length>0){
      dispatch(addCategories(data))
    }
  }, [data])
  

    return (
      <Space wrap className={style.selectCont}>
        <label htmlFor='category'>{t("filters.Categories")}</label>
        <Select
          onChange={change}
          name="category"
          defaultValue="Todos"
          style={{
            width: width,
          }}
          options={categories.map((category) => ({
            label: category.name,
            value: category.name==="Todas"?"":category.name,
          }))}
          
        />
      </Space>
  )
}
export default SelectCategory