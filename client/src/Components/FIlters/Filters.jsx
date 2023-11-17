import style from "./Filters.module.css"
import ClearButton from "./clearButton/ClearButton";
import SelectCategory from "./selectCategory/selectCategory";
import Order from "./selectOrder/Order";
import Type from "./selectType/Type";
import RangePrice from "./rangePrice/rangePrice";
import { addFilter } from "../../libs/redux/features/filterSelice";
import { useSelector, useDispatch} from "react-redux";
import { Row, Col } from 'antd';


const Filters = () => {

  const dispatch=useDispatch()
  
  const filters=useSelector((state)=>state.filters)

  const handleChangeCategory=(value)=>{
    dispatch(addFilter({
      name:"category",
      value:value
    }))
  }
  const handleChangeOrder=(value)=>{
    dispatch(addFilter({
      name:"order",
      value:value
    }))
  }
  const handleChangeType=(value)=>{
    dispatch(addFilter({
      name:"type",
      value:value
    }))
  }

  const handleMinPrice=(value)=>{
    if(value!==null){
      dispatch(addFilter({
        name:"minPrice",
        value:value
      }))
    }else{
      dispatch(addFilter({
        name:"minPrice",
        value:""
      }))
    }
  }

  const handleMaxPrice=(value)=>{
    if(value!==null){
      dispatch(addFilter({
        name:"maxPrice",
        value:value
      }))
    }else{
      dispatch(addFilter({
        name:"maxPrice",
        value:""
      }))
    }
  }
  
  return (
        <div className={style.filterCont}>
          
            <Row gutter={[35, 35]} >
              <Col xs={24} sm={12} md={5} lg={5} className={style.col1} ><SelectCategory change={handleChangeCategory} width={"12vw"}/></Col>
              <Col xs={24} sm={12} md={5} lg={5} className={style.col1} ><Order change={handleChangeOrder} width={"12vw"}/></Col>
              <Col xs={24} sm={12} md={5} lg={5} className={style.col1} ><Type change={handleChangeType} width={"12vw"}/></Col>
              <Col xs={24} sm={12} md={5} lg={5} className={style.col1} ><RangePrice changeMax={handleMaxPrice} changeMin={handleMinPrice}/></Col>
              <Col xs={24} sm={12} md={4} lg={4} className={style.col2}><ClearButton/></Col>
            </Row>
        </div>
  );
};

export default Filters;