import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import UserReview from "./userReview";
import UserImage from './userImage';
import {
  useGetFavProductQuery,
  useAddFavProductMutation,
  useRemoveFavProductMutation,
} from "../../libs/redux/services/favoritesApi";
import { useGetProductByIdQuery } from "../../libs/redux/services/productsApi";
import {
  useGetAllReviewsQuery,
  useAddReviewMutation,
  useEditReviewMutation,
  useRemoveReviewMutation,
} from "../../libs/redux/services/reviewsApi";
import { addProductCart } from "../../libs/redux/features/CartSlice";
import { useGetAllRequestQuery } from "../../libs/redux/services/requestApi";
import { usePutCartMutation } from "../../libs/redux/services/CartApi";
import {
  Spin,
  Alert,
  Card,
  Col,
  Row,
  Rate,
  Button,
  Tabs,
  Modal,
  List,
  Skeleton,
  Avatar,
  Input,
  Tooltip 
} from "antd";
const { Meta } = Card;
const { Item } = Tabs;
const { TabPane } = Tabs;
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styles from "./detail.module.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const Detail = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = id;
  const user = useSelector((state) => state.user.userLog);
  const userId = user?.uid;
  const id_cart = useSelector((state) => state.user.userCartId);
  const cartData = useSelector((state) => state.cart);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleRemoveReview, setIsModalVisibleRemoveReview] =
    useState(false);
  const [isModalVisibleEditReview, setIsModalVisibleEditReview] =
    useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [updateReview, setUpdatedReview] = useState({ comment: "", rating: 0 });

  const {
    data: productDetail,
    isError,
    isLoading,
    refetch: refreshProductDetail
  } = useGetProductByIdQuery(id);
  const { data: productFav, refetch } = useGetFavProductQuery({
    userId,
    productId,
  });

  const [addFavProduct] = useAddFavProductMutation();
  const [removeFavProduct] = useRemoveFavProductMutation();
  const { data: reviews, refetch: getNewReviews } =
    useGetAllReviewsQuery(productId);
  const { data: requests } = useGetAllRequestQuery();
  const [addReview] = useAddReviewMutation();
  const [editReview] = useEditReviewMutation();
  const [removeReview] = useRemoveReviewMutation();
  const [mutate] = usePutCartMutation();

  const handlefavClick = async () => {
    if (productFav) {
      await removeFavProduct({ userId, productId });
    } else {
      await addFavProduct({ userId, productId });
    }
    refetch();
  };

  const [newReview, setNewReview] = useState({ comment: "", rating: 0 });

  const cleanReview = () => {
    setNewReview({ comment: "", rating: 0 });
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (newReview.comment !== "") {
      try {
        await addReview({ productId, userId, newReview });
        cleanReview();
      } catch (error) {
        console.log({ error: error.message, details: error.details });
        alert("Error al agregar review: " + error);
      }
      getNewReviews();
      refreshProductDetail();
    }
  };

  const handleRemoveReview = async (selectedReviewId) => {
    const idReview = selectedReviewId;
    await removeReview({ productId, idReview });

    setIsModalVisibleRemoveReview(false);
    getNewReviews();
    setSelectedReviewId(null);
    refreshProductDetail();
  };

  const handleEditReview = async (selectedReviewId, updateReview) => {
    const idReview = selectedReviewId;
    await editReview({ productId, idReview, updateReview });

    setIsModalVisibleEditReview(false);
    getNewReviews();
    setSelectedReviewId(null);
    refreshProductDetail();
  };

  const handleOk = () => navigate("/*");

  const handleProductCart = async (productDetail) => {
    if (user === null) {
      alert("Tienes que registrarte para agregar productos al carrito");
      navigate("/login");
    } else {
      dispatch(addProductCart(productDetail));
      await mutate({ dataUpdate: cartData, id_cart: id_cart });
    }
  };

  // ¿El usuario ya compró el producto?
  const userRequests = requests?.filter(request => request.uid === userId);
  const productPurchased = userRequests?.some(request => 
    request.products?.some(product => product.id === productId)
  );
  console.log(productPurchased);

  return (
    <div className={styles.detailContainer}>
      {isLoading ? (
        <Spin tip="Cargando" className={styles.loading}>
          <div className="content" />
        </Spin>
      ) : productDetail !== undefined ? (
        <div>
          <Card>
            <Row>
              <Col span={15} className={styles.span}>
                <ArrowLeftOutlined
                  className={styles.back}
                  onClick={() => navigate(-1)}
                />
                <img
                  alt={productDetail.name}
                  src={productDetail.image}
                  className={styles.image}
                />
              </Col>
              <Col span={9}>
                <div className={styles.productInfo}>
                  {!productFav ? (
                    <HeartOutlined
                      size="large"
                      className={styles.noLikedButton}
                      onClick={handlefavClick}
                    />
                  ) : (
                    <HeartFilled
                      size="large"
                      className={styles.likedButton}
                      onClick={handlefavClick}
                    />
                  )}
                  <h1>{productDetail.name}</h1>
                  <h2>${productDetail.price}</h2>
                  <Rate disabled value={productDetail.rating} />
                  <p>{productDetail.category}</p>
                  <Meta
                    description={<p>id: {productDetail.id_product}</p>}
                  />{" "}
                  <br />
                  <div className={styles.productButtons}>
                    <Button
                      type="primary"
                      block
                      onClick={() => handleProductCart(productDetail)}
                    >
                      <ShoppingCartOutlined size="large" />
                    </Button>
                    {/* <Button type="primary" block className={styles.buttonComprar} 
                                            onClick={()=> setIsModalVisible(true)}>Comprar</Button> */}
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <Card>
                  <Tabs defaultActiveKey="1">
                    <Item tab="Descripción" key="1">
                      <div
                        style={{
                          minHeight: "50vh",
                          overflow: "auto",
                          textAlign: "center",
                        }}
                      >
                        <p>{productDetail.description}</p>
                      </div>
                    </Item>
                    <Item tab="Comentarios" key="2">
                      <div
                        style={{
                          maxHeight: "50%",
                          overflow: "auto",
                          textAlign: "center",
                        }}
                      >
                      <div>
                          <h2 className={styles.titleComments}>
                            Danos tu opinión
                          </h2>
                          <div className={styles.contentAddReview}>
                            <Rate
                            disabled={!productPurchased}
                              onChange={(value) =>
                                setNewReview({ ...newReview, rating: value })
                              }
                              value={newReview.rating}
                              className={styles.addRating}
                            />
                            <div className={styles.addReview}>
                            <Tooltip title={!productPurchased ?'Por favor, compra el producto primero para poder comentar.😊' 
                            :''}>
                         
                              <Input.TextArea
                                rows={4}
                                onChange={(e) =>
                                  setNewReview({
                                    ...newReview,
                                    comment: e.target.value,
                                  })
                                }
                                disabled={!productPurchased}
                                value={newReview.comment}
                                className={styles.inputToComment}
                              /> </Tooltip>
                              
                              <Button
                                type="primary"
                                onClick={handleAddReview}
                                className={styles.buttonAddComment}
                                disabled={!productPurchased}
                              >
                                Agregar
                              </Button>

                            </div>
                          </div>

                      </div> 
                        {reviews && reviews.length > 0 ? (
                          <div>
                            <h2 className={styles.Comments}>Comentarios</h2>
                            <List
                              className="comment-list"
                              loading={false}
                              itemLayout="horizontal"
                              loadMore=""
                              dataSource={reviews}
                              renderItem={(item) => (
                                <List.Item
                                  actions={[
                                    userId === item.uid ? (
                                      <div className={styles.iconsRyE}>
                                        <a
                                          key="comment-edit"
                                          onClick={() => {
                                            setIsModalVisibleEditReview(true);
                                            setSelectedReviewId(item.id_review);
                                            setUpdatedReview({
                                              ...updateReview,
                                              comment: item.comment,
                                              rating: item.rating,
                                            });
                                          }}
                                        >
                                          <EditOutlined />
                                        </a>
                                      </div>
                                    ) : (
                                      <div className={styles.iconsRyE}></div>
                                    ),
                                    userId === item.uid || user.is_Admin ? (
                                      <div className={styles.iconsRyE}>
                                        <a
                                          key="comment-delete"
                                          onClick={() => {
                                            setIsModalVisibleRemoveReview(true);
                                            setSelectedReviewId(item.id_review);
                                          }}
                                        >
                                          <DeleteOutlined
                                            style={{ color: "red" }}
                                          />
                                        </a>
                                      </div>
                                    ) : (
                                      <div className={styles.iconsRyE}></div>
                                    ),
                                  ]}
                                >
                                  {/* Eliminar comentario */}
                                  <Modal
                                    title="Eliminar comentario"
                                    visible={isModalVisibleRemoveReview}
                                    onOk={() =>
                                      handleRemoveReview(selectedReviewId)
                                    }
                                    onCancel={() =>
                                      setIsModalVisibleRemoveReview(false)
                                    }
                                  >
                                    <p>
                                      ¿Estás seguro de que quieres eliminar este
                                      comentario?
                                    </p>
                                  </Modal>
                                  {/* Editar comentario */}
                                  <Modal
                                    title="Editar comentario"
                                    visible={isModalVisibleEditReview}
                                    onOk={() =>
                                      handleEditReview(
                                        selectedReviewId,
                                        updateReview
                                      )
                                    }
                                    onCancel={() => {
                                      setIsModalVisibleEditReview(false);
                                      setUpdatedReview({
                                        comment: "",
                                        rating: 0,
                                      });
                                    }}
                                  >
                                    <Rate
                                      onChange={(value) =>
                                        setUpdatedReview({
                                          ...updateReview,
                                          rating: value,
                                        })
                                      }
                                      value={updateReview.rating}
                                    />
                                    <Input
                                      value={updateReview.comment}
                                      onChange={(e) =>
                                        setUpdatedReview({
                                          ...updateReview,
                                          comment: e.target.value,
                                        })
                                      }
                                    />
                                  </Modal>
                                  <Skeleton
                                    avatar
                                    title={false}
                                    loading={item.loading}
                                    active
                                  >
                                    <List.Item.Meta
                                      avatar={<Avatar src={<UserImage id={item.uid}/>} />}
                                      title={
                                        <div className={styles.NameAndRate}>
                                          <div>
                                            <UserReview id={item.uid} />
                                          </div>
                                          <div>
                                            <Rate
                                              disabled
                                              value={item.rating}
                                              style={{ fontSize: "15px" }}
                                            />
                                          </div>
                                        </div>
                                      }
                                      description={
                                        <div
                                          className={styles.descriptionComment}
                                        >
                                          {item.comment}
                                        </div>
                                      }
                                    />
                                    <p className={styles.date}>{item.date}</p>
                                  </Skeleton>
                                </List.Item>
                              )}
                            />
                          </div>
                        ) : productPurchased ?(
                          <Alert
                            message="Sin comentarios"
                            type="info"
                            showIcon
                            description="Sé el primero en dar tu opinión"
                          />
                        ):                           
                        <Alert
                        message="Sin comentarios"
                        type="info"
                        showIcon
                        description='¿Quieres ser el primero en comentar? ¡Compra nuestro producto y comparte tu opinión!'
                      />}
                      </div>
                    </Item>
                  </Tabs>
                </Card>
              </Col>
            </Row>
          </Card>
          <Modal
            title="Confirmar compra"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={() => setIsModalVisible(false)}
          >
            <p>¿Estás seguro de que quieres comprar este producto?</p>
          </Modal>
        </div>
      ) : (
        isError && (
          <Alert
            message="Error"
            description="Por favor, intente de nuevo más tarde."
            type="error"
            showIcon
            className={styles}
          />
        )
      )}
    </div>
  );
};

export default Detail;
