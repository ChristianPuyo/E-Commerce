import { Button} from 'antd';
import { clearFilter } from '../../../libs/redux/features/filterSelice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ClearButton = () => {
  const { t  } = useTranslation("global");

  const filters=useSelector((state)=>state.filters)
  const dispatch=useDispatch()
  const clearAction=()=>{
    dispatch(clearFilter())

  }
  
  return (
    <Button type="primary" onClick={clearAction} style={{color: 'orangered', borderColor: 'orangered', width:"100px"}} ghost>
      <span style={{ fontWeight: 'bold' }}>{t("filters.Clear")}</span>
    </Button>
  )
}
export default ClearButton