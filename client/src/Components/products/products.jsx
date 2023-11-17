import Searchbar from "../searchBar/Searchbar"
import Filters from "../FIlters/Filters"
import CardsProducts from "../cardsProducts/cardsProducts";
import Paginate from "../paginate/paginate";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../libs/redux/features/productsSlice";
import style from "./products.module.css"
import { useTranslation } from "react-i18next";

const Products = () => {

  const { t } = useTranslation("global");
    const dispatch=useDispatch()
    const {name}=useSelector((state)=>state.filters)
    const products = useSelector((state) => state.items.allProducts);
    const productsFilter=products?.filter((product) => product.is_Delete ===false)
    const currentPage = useSelector((state) => state.items.currentPage);
    const itemsPerPage = useSelector((state) => state.items.itemsPerPage);
    const startIndex = (currentPage-1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToDisplay = productsFilter.slice(startIndex, endIndex);

    const paginate = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
      };

  return (
    <div className={style.products_cont} id="products">
      <h2 className={style.sectionTitle}>{t("Products.ProductsTitle")}</h2>
      <div className={style.search_filter_cont}>
        <Searchbar/>
        <Filters/>
      </div>
      <div className={style.productsSection}>
        <Paginate productsFilter={productsFilter} currentPage={currentPage} itemsPerPage={itemsPerPage} paginate={paginate}/>
        <CardsProducts productsToDisplay={productsToDisplay} name={name}/>
      </div>
    </div>
  )
}

export default Products
