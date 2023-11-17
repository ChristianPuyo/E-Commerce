import './aboutUs.css'
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5'
import {MdOutlineMailOutline} from 'react-icons/md'
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const coders = [
  {
    id: 1,
    fullName: "Christian Puyo",
    description:"Desarrollador web full stack con una sólida formación en React, Redux, Nodejs, JavaScript.",
    linkAvatar: "/public/cris.jpeg",
    linkedin: " https://www.linkedin.com/in/christian-dustin-puyo-torres-b08082253/",
    github: "https://github.com/ChristianPuyo",
    email: "christianpuyotorres@gmail.com"
  },
  {
    id: 2,
    fullName: "Liliana Rosada",
    description:"Analítica con alto nivel de persistencia, dedicada, responsable y comprometida para las relaciones interpersonales.",
    linkAvatar: "/public/lil.jpeg",
    linkedin: "https://www.linkedin.com/in/liliana-rosada-46114516a",
    github: "https://github.com/LILYCERON",
    email: "lilyceron00@gmail.com"
  },
  {
    id: 3,
    fullName: "Javier Sosa",
    description:"Desarrollador Web Full Stack, orientado a Front-end con React, en proyectos e-commerce estructurados a las tendencias de mercado en base a la demanda.",
    linkAvatar: "/public/Javi.jpg",
    linkedin: "https://www.linkedin.com/in/pablo-javier-sosa-179a31195/",
    github: "https://github.com/JavierSosaAdm",
    email: "javier.sosa.1911@mail.com"
  },
  {
    id: 4,
    fullName: "Nahim Mora",
    description:"Experiencia en el desarrollo de aplicaciones web interactivas y escalables. Especializado en JavaScript, React, Node.js, Express.js, Sequelize y PostgreSQL.",
    linkAvatar: "/public/Nahim.jpg",
    linkedin: "https://www.linkedin.com/in/fernando-nahim-mora-developer",
    github: "https://github.com/NahimMora",
    email: "nahimprogramming@gmail.com"
  },
  {
    id: 5,
    fullName: "Mateo Leon",
    description:"Desarrollador web fullstack con especialización en frontend. Apasionado por crear experiencias de usuario agradables y funcionales.",
    linkAvatar: "/public/Matty.jpg",
    linkedin: " https://www.linkedin.com/in/mateo-le%C3%B3n-097b57268?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", 
    github: "https://github.com/MateoLeon505",
    email: "mateolt505@gmail.com "
  },
  {
    id: 6,
    fullName: "Thomas Rey",
    description:"Programador resolutivo y apasionado. Siempre aprendiendo. Innovador, adaptativo, ansioso por integrar últimas tecnologías. Enfocado en resultados.",
    linkAvatar: "/public/Thomy.jpg",
    linkedin: "https://www.linkedin.com/in/thomas-rey-39099021b/",
    github: "https://github.com/thomasrey99",
    email: "thomas_rey1999@outlook.com"
  },
  {
    id: 7,
    fullName: "Mariano Masondo",
    description: "Desarrollador Full Stack apasionado por la tecnología en busca constante de soluciones en base a la experiencia, creatividad y disposición para aportar a tu equipo.",
    linkAvatar: "/public/Mariano.jpg",
    linkedin: "https://www.linkedin.com/in/mariano-masondo-7026b0254",
    github: "https://github.com/MarianoMasondo",
    email: "nanomason@gmail.com"
    
  }
]

const AboutUs = () => {
  
  const { t  } = useTranslation("global");
  
  useEffect(() => {
    AOS.init(); 
  }, []);
  
  return (
    <div className='container'>
      <h1 style={{fontFamily: 'var(--primary-font)'}}>{t("about.title")}</h1>
      <div>
        <p style={{fontFamily: 'var(--primary-font)', textAlign: 'center', margin: '0px 150px'}}>{t("about.description")}</p>
      </div>
      <div className='cards__container'>
        {coders.map((coder) => {
          return (
            <div key={coder.id} className='card' data-aos="zoom-in" data-aos-delay="700" data-aos-duration={coder.id}>
              <img className='card__image' src={`${coder.linkAvatar}`} width="200" height="200" />
              <h5 className='card__text'>{coder.fullName}</h5>
              <p style={{fontFamily: 'var(--primary-font)', textAlign: 'center'}}>{t("coder." + coder.id)}</p>
              <div className='card__links'>
                <a href={`${coder.github}`} target="_blank" rel="noopener noreferrer"><GithubOutlined /></a>
                <a href={`mailto:${coder.email}`} target="_blank" rel="noopener noreferrer"><MailOutlined /></a>
                <a href={`${coder.linkedin}`} target="_blank" rel="noopener noreferrer"><LinkedinOutlined /></a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AboutUs;