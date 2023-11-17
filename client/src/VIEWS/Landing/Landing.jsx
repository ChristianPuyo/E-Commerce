import React, { useState, useEffect } from 'react';
import style from './Landing.module.css';
import logo from '../../assets/Las_encinas_Logo.png';
import Home from '../Home/Home';

const Landing = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [isHomeLoaded, setIsHomeLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
      window.location.replace('/home');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleHomeLoad = () => {
    setIsHomeLoaded(true);
  };

  return (
    <div className={style.landingContainer}>
      {showLanding ? (
        <img src={logo} className={style.imgLogo} alt="Logo" />
      ) : (
        <Home onLoad={handleHomeLoad} />
      )}
      {showLanding || isHomeLoaded || (
        <div className={style.loadingOverlay}>
          Cargando...
        </div>
      )}
    </div>
  );
};

export default Landing;
