import { useState, useRef } from 'react';
import { Auth } from './component/auth';
import { signOut } from "firebase/auth"
import { auth } from "../src/firebase-config"
import './App.css';
import { Chat } from './component/chat';
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("chat-cookie"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async ()=>{
    await signOut(auth);
    cookies.remove("chat-cookie")
    setIsAuth(false);
    setRoom(null);
  };

  if(!isAuth){
    return (
      <div>
        <h1>Creating a Chat App</h1>
        <Auth setIsAuth = {setIsAuth}/>
      </div>
    );
  }

  return(
    <>
      {room ? (
        <Chat room={room}/>
      ) : (
        <div className='room'> 
          <label>Enter Room Name:</label>
          <input ref={roomInputRef}/>
          <button onClick={()=> setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
      )}

      <div className='signout'>
        <button onClick={signUserOut}>Sign Out</button>
      </div>

    </>
  );

  
}

export default App;
