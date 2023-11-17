require("dotenv").config(); 
const { VITE_URL_FRONT } = process.env;
const mercadopago = require("mercadopago")
const { productId, 
    allProducts, 
    postProductContoller, 
    putProductContoller,
    deleteProductContoller,
    patchProductContoller,
  } = require("../controllers/productsControllers");

//!HANDLER QUE MANEJA LA PETICION GET POR ID DE /USERS/:ID
const getProductById  = async ( req, res ) => {

const { id } = req.params

try {
    const result = await productId(id)
    res.status(200).json(result)
} catch (error) {
    res.status(400).json({ error: error.message });
}

}

//!HANDLER QUE MANEJA LA PETICION GET DE /PRODUCTS, TRAE NAME, CATEGORY, MINPRICE Y MAXPRICE POR QUERY PARA POSIBLES FILTROS
const getAllProducts = async ( req, res ) => {
    const {name, minPrice, maxPrice, category, type, order, is_Delete }=req.query
    try {
        
        const result = await allProducts(name, minPrice, maxPrice, category,type, order, is_Delete)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

}

//!HANDLER QUE MANEJA LA PETICION POST A /PRODUCTS
const postProduct = async(req, res) =>{
    const {image, name, price, description, raiting, category, type} = req.body;
    try {
        const data={
            image:image,
            name:name,
            price:Number(price),
            description:description,
            raiting:raiting,
            category:category,
            type:type
        }
        const result = await postProductContoller(data)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//HANDLER QUE MANEJA LA PETICIÓN PUT A /Products
const putProduct = async(req, res) =>{
const { id } = req.params;
const {image, name, price, description, raiting, category} = req.body;
try {
    const data={
        image:image,
        name:name,
        price:price,
        description:description,
        raiting:raiting,
        category:category
    }
    const result = await putProductContoller(id, data)
    res.status(201).json(result)
} catch (error) {
    res.status(400).json({ error: error.message });
}
}

//HANDLER QUE MANEJA LA PETICIÓN Patch A /Products
const patchProduct = async(req, res) =>{
const { id } = req.params;
const {is_Delete} = req.body;

try {
    const result = await patchProductContoller(id, is_Delete)
    res.status(201).json(result)
} catch (error) {
    res.status(400).json({ error: error.message });
}
}

//Handler que maneja la petición delete a /Products
const deleteProduct = async(req, res) =>{
const { id } = req.params;

try {
    const result = await deleteProductContoller(id)
    res.status(201).json(result)
} catch (error) {
    res.status(400).json({ error: error.message });
}
}

const createPreference = async (req, res) => {
     mercadopago.configure({
        access_token:"TEST-660730855105859-110520-92b6b5e11789fb102cda49503b4995c6-1501138541"
    })

    
    const {description, price, quantity, id_user}=req.body
    
    let preference = {
		items: [
			{
				title: description,
				unit_price: Number(price),
				quantity: quantity,
			}
		],
		back_urls: {
			"success": `${VITE_URL_FRONT}/home`,
			"failure": `${VITE_URL_FRONT}/home`,
			"pending": ""
		},
        external_reference:`${id_user}`,
		auto_return: "approved",
	};

    mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		})
        .catch(function (error) {
			console.log(error);
		});
};

module.exports = {
    getProductById,
    getAllProducts,
    postProduct,
    putProduct,
    deleteProduct,
    createPreference,
    patchProduct
}

