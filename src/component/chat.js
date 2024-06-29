import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from  "firebase/firestore";
import { auth, database } from "../firebase-config.js";
import "../style/chat.css";

export const Chat = (props)=>{
    const { room } = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesRef = collection(database, "messages");

    useEffect(() =>{
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("creatAt"));
        const unsubscribe = onSnapshot(queryMessages, (snapshot) =>{
            let messages = [];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id: doc.id})
            });
            setMessages(messages);
        })

        return ()=> unsubscribe();
    }, []);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            creatAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });
        setNewMessage("");
    }


    return(
        <div className="chat-app">
            <div className="header">
                <h3>Welcome to: {room.toUpperCase()}</h3>
            </div>
            <div className="messages">
                {messages.map((message) =>(
                    <div className="message" key={message.id}>
                        <span className="user">{message.user}:</span>
                        {message.text}
                    </div>
                ))}
            </div>
            {/* <div>{messages.map((message) => <h1>{message.text}</h1>)}</div> */}
            <form onSubmit={handleSubmit} className="new-message-form">
                <input 
                    className="new-message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button type="submit" className="send-button">
                    send
                </button>
            </form>
        </div>
    )
}