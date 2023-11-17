// import React, { useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import io from 'socket.io-client';
// import styles from './Chat.module.css'; 
// const URL_SERVER = import.meta.env.VITE_URL_SERVER; 

// const socket = io(URL_SERVER); // para el chat en vivo

// const Chat = () => {
//   const currentUser = useSelector(state => state.user.userLog);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const messageListRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newMessage = { userName: currentUser.name.toString(), text: message };

//     // Emitir el mensaje al servidor de Socket.IO
//     socket.emit('message', newMessage);

//     // Enviar el mensaje a la ruta de tu servidor que espera mensajes
//     fetch(`${URL_SERVER}/messages`, {
//       method: 'POST', // o el método que uses en tu servidor
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newMessage),
//     });

//     // Agregar el mensaje al estado local
//     setMessages((state) => [...state, newMessage]);

//     setMessage('');
//   };

//   useEffect(() => {
//     // Obtener mensajes al montar el componente
//     fetch(`${URL_SERVER}/messages`)
//       .then(response => response.json())
//       .then(data => setMessages(data))
//       .catch(error => console.error('Error al obtener mensajes:', error));
//   }, []);

//   useEffect(() => {
//     if (messageListRef.current) {
//       // Scroll hacia abajo después de que los mensajes se hayan cargado
//       messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const receiveMessage = (message) => {
//     // Agregar el mensaje al estado, ya sea del usuario actual o de otros usuarios
//     setMessages((state) => [...state, message]);
//   };

//   useEffect(() => {
//     socket.on('message', receiveMessage);
//     return () => {
//       socket.off('message', receiveMessage);
//     };
//   }, []);

//   return (
//     <div>
//       <h2 className={styles.titleChat}>Sala de Chat en Vivo</h2>
// <div className={styles.container}>
//       <ul ref={messageListRef} className={styles.messageList}>
//         {messages.map((msg, index) => (
//           <li key={index} className={styles.messageItem}>
//             <span>{msg.userName}:</span> {msg.text}
//           </li>
//         ))}
//       </ul>

//       <form onSubmit={handleSubmit} className={styles.messageInputContainer}>
//         <input
//           type="text"
//           placeholder="Escribe tu mensaje aquí"
//           onChange={(e) => setMessage(e.target.value)}
//           value={message}
//           className={styles.messageInput}
//         />
//         <button type="submit" className={styles.sendButton}>Enviar</button>
//       </form>
//     </div>
//     </div>
    
//   );
// };

// export default Chat; 




import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client';
import styles from './Chat.module.css'; 
const URL_SERVER = import.meta.env.VITE_URL_SERVER; 

const socket = io(URL_SERVER);

const Chat = () => {
  const currentUser = useSelector(state => state.user.userLog);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      userName: currentUser.name.toString(),
      text: message,
      timestamp: new Date().toISOString(),
    };

    socket.emit('message', newMessage);

    fetch(`${URL_SERVER}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    });

    setMessages((state) => [...state, newMessage]);

    setMessage('');
  };

  useEffect(() => {
    fetch(`${URL_SERVER}/messages`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error al obtener mensajes:', error));
  }, []);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const receiveMessage = (message) => {
    setMessages((state) => [...state, message]);
  };

  useEffect(() => {
    socket.on('message', receiveMessage);
    return () => {
      socket.off('message', receiveMessage);
    };
  }, []);

  const formatTimestamp = (timestamp) => {
    // Verificar si el timestamp es un valor válido antes de intentar formatearlo
    if (!timestamp || isNaN(new Date(timestamp).getTime())) {
      return 'Fecha y hora no disponibles';
    }
  
    const date = new Date(timestamp);
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = new Intl.DateTimeFormat('es-ES', options).format(date);
  
    return `${formattedDate} ${formattedTime}`;
  };
  
  

  return (
    <div className={styles.chatCont}>
      <h2 className={styles.titleChat}>Chatea con nosotros</h2>
      <div className={styles.container}>
        <ul ref={messageListRef} className={styles.messageList}>
          {messages.map((msg, index) => (
            <li key={index} className={styles.messageItem}>
              <span>{msg.userName}:</span> {msg.text}<br></br>
              <div className={styles.timestamp}>{formatTimestamp(msg.timestamp)}</div>
            </li>
          ))}
        </ul>

       
      </div>
      <form onSubmit={handleSubmit} className={styles.messageInputContainer}>
          <input
            type="text"
            placeholder="Escribe tu mensaje aquí"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className={styles.messageInput}
          />
          <button type="submit" className={styles.sendButton}>Enviar</button>
        </form>
    </div>
  );
};

export default Chat;
