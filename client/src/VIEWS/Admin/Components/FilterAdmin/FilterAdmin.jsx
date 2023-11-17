import style from "./FilterAdmin.module.css"
import ClearButton from "../../../../Components/FIlters/clearButton/ClearButton";
import SelectCategory from "../../../../Components/FIlters/selectCategory/selectCategory";
import Type from "../../../../Components/FIlters/selectType/Type";
import SearchBarProducts from "../SearchBarProducts/SearchBarProducts";
import Status from "../../../../Components/FIlters/selectStatus/Status"

import { addFilter, statusFilter } from "../../../../libs/redux/features/filterSelice";

import { useDispatch } from "react-redux";

import { Col, Row } from 'antd';
import { useEffect, useState } from "react";

const FilterAdmin = () => {

  const dispatch = useDispatch()

  const handleChangeCategory = (value) => {
    dispatch(addFilter({
      name: "category",
      value: value
    }))
  }

  const handleChangeType = (value) => {
    dispatch(addFilter({
      name: "type",
      value: value
    }))
  }

  const handleChangeStatus = (value) => {
    if (value === 'Todos') {
      dispatch(statusFilter())
    } else {
      dispatch(addFilter({
        name: "status",
        value: value
      }))
    }
  }

  // ZONA DE RENDERIZADO RESPONSIVE 

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
  
    <div >
      { windowWidth < 768 ? (
      <div>
        <br/>
      <Row>
        <Col span={12}><SearchBarProducts/></Col>
        <Col span={12}><Status change={handleChangeStatus} width={"30vh"}/></Col>
      </Row>
        <br/>
      <Row>
        <Col span={12}><SelectCategory change={handleChangeCategory} width={"30vh"}/></Col>
        <Col span={12}><Type change={handleChangeType} width={"30vh"}/></Col>
      </Row>
        <br/>
      <div style={{display: "flex", justifyContent:"center"}}><ClearButton/></div>
      </div>
      ) : (
        <>
        <Row>
          <Col span={6}><SearchBarProducts width={"22vh"}/></Col>
          <Col span={6}><Status change={handleChangeStatus} width={"22vh"}/></Col>
          <Col span={6}><SelectCategory change={handleChangeCategory} width={"22vh"}/></Col>
          <Col span={6}><Type change={handleChangeType} width={"22vh"}/></Col>
        </Row>
        <br/>
        <div style={{display: "flex", justifyContent:"center"}}><ClearButton/></div>
        </>
      )
      
    }
    </div>
  )

}

export default FilterAdmin