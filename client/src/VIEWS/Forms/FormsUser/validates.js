const Validates = (form, errors, setErrors) => {

    if (form.name) {
        
        if (/^[A-Z][a-z]*$/.test(form.name)) {
            setErrors((prev) =>({...prev, name: ''}))
        } else {
            setErrors((prev) => ({...prev, name: '*Nombre inválido'}))
        }        
    }; 


    if (form.lastName) {
    
        if (/^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/.test(form.lastName)) {
            setErrors((prev) =>({...prev, lastName: ''}))
        } else {
            setErrors((prev) => ({...prev, lastName: '*Apellido inválido'}))
        };   
    };

    if (form.address) {
    
        if (/^[A-Z][A-Za-z0-9\s]*$/.test(form.address)) {
        setErrors((prev) =>({...prev, address: ''}))
        } else {
            setErrors((prev) => ({...prev, address: '*Dirección inválida'}))
        };   
    };

    if (form.email) {
    
        if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email)) {
            setErrors((prev) =>({...prev, email: ''}))
        } else {
            setErrors((prev) => ({...prev, email: '*Email inválido'}))
        };   
    };

    if (form.phone) {
    
        if (/^\d{8,}$/.test(form.phone)) {
            setErrors((prev) =>({...prev, phone: ''}))
        } else {
            setErrors((prev) => ({...prev, phone: '*Número inválido'}))
        };   
    };

    if (form.password) {
    
        if (/^[a-zA-Z0-9]+$/.test(form.password)) {
            setErrors((prev) =>({...prev, password: ''}))
        } else {
            setErrors((prev) => ({...prev, password: '*Contraseña inválida'}))
        };   
    };

};

export default Validates;