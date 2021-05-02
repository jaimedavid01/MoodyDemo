import React, { useState, useEffect } from 'react'
import './Chat.css'
import {Avatar, IconButton} from '@material-ui/core'
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from "react-router-dom";
import db from './firebase';
import firebase from 'firebase';
import {useStateValue} from "./StateProvider";

function Chat() {
    
    const [input, setInput] = useState("")
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue();
    const [emotion, setEmotion] = useState("")

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });

            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });

        }
    },[roomId])

    const sendMessage = (e) => {
        //POST fetch request to send message
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            emotion: emotion,
        })

        setInput("");
    }


    return (
        <div className='chat'>
            <div className='chat__header'>
                {/* Other User's Pic Here */}
                <Avatar />
                <div className='chat__headerInfo'>
                    <h3 className='chat-room-name'>{roomName}</h3>
                    <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                    
                </div>
            </div>
            <div className='chat__body'>
                {messages.map(message => (
                    <p className={`chat__message ${message.emotion} ${ message.name == user.displayName && 'chat__receiver'}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}<br></br>
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                        <p className="emo">:{message.emotion}:</p>
                    </p>
                ))}
            </div>
            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}> Send</button>
                    <select className="select" onChange={(e) => setEmotion(e.target.value)}>
                    <option value=''>Mood</option>
                    <option value='happy'>Happy</option>
                    <option value= "sad">Sad</option>
                    <option value= "excited">Excited</option>
                    <option value= "sarcastic">Sarcastic</option>
                    <option value= "flirty">Flirty</option>
                    <option value= "angry">Angry</option>
                    <option value= "joking">Joking</option>
                    <option value= "confused">Confused</option>
                    <option value= "serious">Serious</option>
                    <option value= "passionate">Passionate</option>
                </select>
                </form>
                <MicIcon/>
            </div>
            
        </div>
    )
}

export default Chat;
