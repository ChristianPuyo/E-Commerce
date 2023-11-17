import axios from "axios"
import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from '../../Views/Style/Forms.module.css'
import Swal from 'sweetalert2';

import { useUpdateProductMutation , useGetProductByIdQuery } from '../../../../libs/redux/services/productsApi';

const FormEditProduct = () => {

  const { id } = useParams()
  const navigate = useNavigate();

  const types=useSelector((state)=>state.types.allTypes)

  const categories=useSelector((state)=>state.categories.allCategories)

  const {data} = useGetProductByIdQuery(id);
  const [mutate] = useUpdateProductMutation()

  const [imageToCloud, setImageToCloud] = useState("");
  const [state, setState] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    raiting: 0,
    category: [],
    type: "",
  });

  useEffect(() => {
    if (data) {
      const { name, image, price, description, raiting, category, type } = data;
      setState({
        name,
        image,
        price,
        description,
        raiting,
        category: category.split(","), // Si category es una cadena separada por comas
        type: type.split(","), // Si type es una cadena separada por comas
      });
    }
  }, [data]);

  const resetState = () => {
    setState({
      name: "",
      image: "",
      price: 0,
      description: "",
      raiting: 0,
      category: [],
      type: "",
    });
  };

  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImageToCloud(reader.result);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Las Encinas Boutique");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dkgeccpz4/image/upload",
          formData
        );
        const imageUrl = response.data.secure_url;

        setState({
          ...state,
          image: imageUrl,
        });
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      }
      previewFiles(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const categoryString = state.category.join(",");
        const typeString = state.type.join(",");
        const dataToSend = { ...state, category: categoryString, type: typeString };
        console.log(id);
        await mutate({id: id, updatedProduct: dataToSend,});          
        resetState();
        showSuccessAlert();
    } catch (error) {
      showErrorAlert(error)
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: '¡Muy bien!',
      text: 'Producto editado exitosamente',
      icon: 'success',
      confirmButtonText: "Volver",
      confirmButtonColor: '#588157',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/productsAdmin'); // Realiza la redirección utilizando useNavigate
      }
    });
  };
  const showErrorAlert = (error) => {
    Swal.fire({
      title: '¡Error!',
      text: {error},
      icon: 'error',
      confirmButtonColor: '#ae2012',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/productsAdmin'); // Realiza la redirección utilizando useNavigate
      }
    });
  };

return (
    <div className={styles.Container}>
        <form className={styles.Form} onSubmit={handleSubmit}>

            <h1 className={styles.tittle}>Editar producto</h1>

            <div className={styles.Section}>
                <div className={styles.Element1}>
                <label className={styles.labels}>Nombre:</label>
                <input className={styles.InputText} type="text" name="name" value={state.name} onChange={(e) => handleChange("name", e.target.value)}/>
                </div>

                <div className={styles.Element1}>
                <label className={styles.labels}>Precio:</label>
                <input className={styles.InputNumber} type="number" min="1" name="price" value={state.price} onChange={(e) => handleChange("price", e.target.value)}/>
                </div>

                <div className={styles.Element1}>
                <label className={styles.labels}>Descripción:</label>
                <textarea className={styles.TextArea} rows="4" name="description" value={state.description} onChange={(e) => handleChange("description", e.target.value)}/>
                </div>

                <div className={styles.Element1}>
                <label className={styles.labels}>Rate:</label>
                <input className={styles.InputNumber} type="number" name="raiting" value={state.raiting} onChange={(e) => handleChange("raiting", e.target.value)} />
                </div>
            </div>

            <div className={styles.Section}>

                <div className={styles.Element}>
                <label className={styles.labels}>Imagen:</label>
                <input className={styles.InputText} type="text" name="image" value={state.image} onChange={(e) => handleChange("image", e.target.value)} />
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>

            </div>

            {imageToCloud && (
                <div style={{ display: "flex", justifyContent: "center", margin: "1%"}}>
                    <img src={imageToCloud} alt="" style={{ maxWidth: "10%", maxHeight: "auto" }}/>
                </div>
            )}

            <div className={styles.Section2}>
                
                <div className={styles.Element2}>
                <label className={styles.labels}>Categorías:</label>
                <select className={styles.select1} name="category" multiple value={state.category} onChange={(e) => handleChange("category", [...e.target.options].filter((option) => option.selected).map((option) => option.value))}>
                {categories?.map((c, i) => (<option value={c.name} key={i}>{c.name}</option>))}
                </select>
                </div>

                <div className={styles.Element2}>
                <label className={styles.labels}>Tipo:</label>
                <select className={styles.select1} name="type" multiple value={state.type} onChange={(e) => handleChange("type", [...e.target.options].filter((option) => option.selected).map((option) => option.value))}>
                {types?.map((t, i) => (<option value={t.name} key={i}>{t.name}</option>))}
                </select>
                </div>

            </div>
            
            <div className={styles.Section}>
            <button className={styles.button1} type="submit">Actualizar producto</button>
            <Link to="/productsAdmin"><button className={styles.button1}>Volver</button></Link>
            </div>
            
        </form>
    </div>
    )
};

export default FormEditProduct;