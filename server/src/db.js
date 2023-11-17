const { Sequelize } = require("sequelize");
const userModel=require("./models/User")
const productModel=require("./models/Product")
const requestModel=require("./models/Request")
const categoryModel=require("./models/Category")
const typeModel=require("./models/Type")
const cartModel=require("./models/Cart")
const reviewModel=require("./models/Review")
const messageModel=require("./models/Message");
const paymentModel=require("./models/payment")

require("dotenv").config(); 


const {
  DB_USER,
  DB_PASSWORD,  
  DB_HOST, 
  DB_NAME,
  DB_DIALECT,
  DB_PORT,
  DB_SERVER_DEPLOY
} = process.env;  

// ACTIVAR ESTA SECCIÓN CUANDO QUIERES TRABAJAR CON LA BD LOCAL
const dataBase=new Sequelize(   
  `${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {logging:false}  
)

// ACTIVAR ESTA SECCIÓN CUANDO QUIERES TRABAJAR CON LA BD DEPLOYADA
// const dataBase=new Sequelize( 
//   `${DB_SERVER_DEPLOY}`,
//   {logging:false, dialectOptions:{ssl:{require:true}}}
// )

userModel(dataBase)
productModel(dataBase)
categoryModel(dataBase)
typeModel(dataBase)
requestModel(dataBase)
cartModel(dataBase)
reviewModel(dataBase)
messageModel(dataBase)
paymentModel(dataBase)

//!RELACIONES

const { User, Product, Request, Cart, Category, Type, Review, Payment, Message } = dataBase.models;


//*un producto puede tener una categoria y una categoria puede tener varios productos

Category.hasMany(Product, {foreignKey:"id_category"})
Product.belongsTo(Category, {foreignKey:"id_category"})

//*un usuario puede tener muchos mensajes y un mensaje pertenece a un solo usuario
User.hasMany(Message, {foreignKey: "uid"})
Message.belongsTo(User, { foreignKey: 'uid' })

//*un producto puede tener un tipo y un tipo puede tener varios productos

Type.hasMany(Product, {foreignKey:"id_type"})
Product.belongsTo(Type, {foreignKey:"id_type"})

//*un usuario puede comprar varios productos y un producto puede ser comprado por varios usuarios

User.belongsToMany(Product, {through: 'user_product'})
Product.belongsToMany(User, {through: 'user_product'})

//*un usuario puede tener un carrito y un carrito pertenece a un unico usuario

User.hasOne(Cart, {onDelete:'CASCADE'})
Cart.belongsTo(User)

//*un usuario puede hacer varios pedidos y un pedido pertenece a un solo usuario

User.hasMany(Request, {foreignKey:"uid", onDelete: 'CASCADE'})
Request.belongsTo(User, {foreignKey:"uid", onDelete: 'CASCADE'})

//*un producto puede tener varias ordenes y una orden puede tener varios productos

Product.belongsToMany(Request , { through: 'product_request', onDelete: 'CASCADE' });
Request.belongsToMany(Product , { through: 'product_request', onDelete: 'CASCADE' });

//*un producto puede estar en varios carritos y un carrito puede tener varios productos

Product.belongsToMany(Cart, {through:"Product_cart", onDelete: 'CASCADE'})
Cart.belongsToMany(Product, {through:"Product_cart", onDelete: 'CASCADE'})

//*un producto puede ser comprado por varios usuarios y un usuario puede comprar varios productos

Product.belongsToMany(User, {through:"user_product"})
User.belongsToMany(Product, {through:"user_product"})

//*Un usuario puede tener varios productos favoritos y un producto puede ser el favorito de varios usuarios
User.belongsToMany(Product, { through: 'Favorites' });
Product.belongsToMany(User, { through: 'Favorites' });

//*Un usuario puede ejecutar varios pagos, pero un pago puede ser realizado por un unico usuario
User.hasMany(Payment, {foreignKey:"uid", onDelete: 'CASCADE'})
Payment.belongsTo(User, {foreignKey:"uid", onDelete: 'CASCADE'})

//!REVIEWS

//Cada Product y User pueden tener varias Review
Product.hasMany(Review, { foreignKey: 'id_product' });
User.hasMany(Review, { foreignKey: 'uid' });

//Cada Review pertenece a un Product y a un User
Review.belongsTo(Product, { foreignKey: 'id_product' });
Review.belongsTo(User, { foreignKey: 'uid' });

module.exports={
  ...dataBase.models, 
  dataBase
}
