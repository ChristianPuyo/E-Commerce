import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../Views/Style/Forms.module.css'
import axios from "axios"

import { useCreateProductMutation } from '../../../../libs/redux/services/productsApi';
import { useLocalStorage  } from "../../../../Hooks/useLocalStorage";

import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const FormCreateProduct = () => {

  const navigate = useNavigate();

  const types=useSelector((state)=>state.types.allTypes)

  const categories=useSelector((state)=>state.categories.allCategories)

  const [mutate] = useCreateProductMutation();

  const [imageToCloud, setImageToCloud] = useState('');

  const [localCategories, setLocalCategories] = useLocalStorage("categories", []);
  const [localTypes, setLocalTypes] = useLocalStorage("types", []);

  const [state, setState] = useLocalStorage("state", {
    name: '',
    image: '',
    price: '',
    description: '',
    raiting: 0,
    category: [],
    type:""
  });

  const resetState = () => { setState({ name: '', image: '', price: 0, description: '', rating: 0, category: [], type:"" });};

  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    if (categories.length > 0) {
      // Si categories contiene datos, guárdalos en el estado local
      setLocalCategories(categories);
    }
    if (types.length > 0) {
      // Si categories contiene datos, guárdalos en el estado local
      setLocalTypes(types);
    }
  }, [categories, types]);

  // Vista previa de imagen
  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImageToCloud(reader.result);
  }
  
  // Actualiza estado con la imagen subbida
  const handleImageUpload = async (e) =>  {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Las Encinas Boutique'); 
    
        const response = await axios.post('https://api.cloudinary.com/v1_1/dkgeccpz4/image/upload', formData);
        const imageUrl = response.data.secure_url;
    
        setState({
          ...state,
          image: imageUrl,
        });
      } catch (error) {
        console.error('Error al cargar la imagen', error);
      }
      previewFiles(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryString = state.category.join(',');
      const typeString=state.type.join(',')
      const dataToSend = {...state, category: categoryString, type:typeString};
      await mutate(dataToSend);
      resetState();
      showSuccessAlert();
   } catch (error) {
      showErrorAlert(error)
   }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: '¡Muy bien!',
      text: 'Producto creado exitosamente',
      icon: 'success',
      confirmButtonText: "Volver",
      confirmButtonColor: '#588157',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/productsAdmin');
      }
    });
  };

  const showErrorAlert = (error) => {
    Swal.fire({
      title: '¡Error!',
      text: error,
      icon: 'error',
      confirmButtonColor: '#ae2012',
    })};

    console.log(localTypes, localCategories);

  return (
    <div className={styles.Container}>
      <form className={styles.Form} onSubmit={handleSubmit}>

<h1 className={styles.tittle}>Crear Producto</h1>

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

    {/* <div className={styles.Element1}>
    <label className={styles.labels}>Rate:</label>
    <input type="number" name="raiting" value={state.raiting} onChange={(e) => handleChange("raiting", e.target.value)} />
    </div> */}
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
    {localCategories?.map((category, i) => (<option value={category.name} key={i}>{category.name}</option>))}
    </select>
    </div>

    <div className={styles.Element2}>
    <label className={styles.labels}>Tipo:</label>
    <select className={styles.select1} name="type" multiple value={state.type} onChange={(e) => handleChange("type", [...e.target.options].filter((option) => option.selected).map((option) => option.value))}>
    {localTypes?.map((type, i) => (<option value={type.name} key={i}>{type.name}</option>))}
    </select>
    </div>

</div>

<div className={styles.Section}>
<button className={styles.button1} type="submit">Crear producto</button>
<Link to="/productsAdmin"><button className={styles.button1}>Volver</button></Link>
</div>

</form>
    </div>
  );
};

export default FormCreateProduct;
