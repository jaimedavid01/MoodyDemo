import React, {useEffect, useState} from 'react';
import './SidebarChat.css'
import {Avatar} from '@material-ui/core'
import db from "./firebase"
import { Link } from "react-router-dom";

function SidebarChat({ addNewChat, id, name }) {
    const [messages, setMessages] = useState("");
    
    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);
    
    
    
    const createChat = () => {
        const roomName = prompt("Please Enter Name for Chat");

        if(roomName){
            db.collection("rooms").add({
                name: roomName
            })
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`} key={id}>
            <div className="sidebarChat">
                <Avatar /* src={user.image} */ />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2 className="add">Add New Chat</h2>
        </div>
    )
}


export default SidebarChat

