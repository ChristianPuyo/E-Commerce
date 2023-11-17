import { Pagination } from "antd";
import style from "./paginate.module.css"

const Paginate=({productsFilter, itemsPerPage, paginate, currentPage})=>{

    
    return(
        <div className={style.pagCont}>
            <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={productsFilter?.length}
            onChange={paginate}
            />
        </div>
    )
}

export default Paginate