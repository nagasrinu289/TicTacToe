import React, { useState } from 'react';
import './onlineMode.css';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import OnlineGame from '../Game/online/OnlineGame';


const OnlineMode = () => {
    const [username, setUsername] = useState("");
    const [socket,setSocket] = useState(null);
    const [opponent,setOpponent] = useState("");
    const [start,setStart] = useState(false);
    const [playingAs,setPlayingAs] = useState(null);
    const [waiting,setWaiting] = useState(false);


    const handleClick = () => {
        setWaiting(true);
        console.log(import.meta.env.VITE_SOCKET_URL);
        console.log("hello")
        if(username.trim() === ""){
            return
        }
        const newSocket = io('https://tic-tac-toe-ht76.vercel.app/', {
            autoConnect: true
        });
        newSocket.emit('request_to_play', {
            playerName: username
        }
        );
        setSocket(newSocket);
        
    }
    socket?.on("opponentNotFound",()=>{
        setOpponent(false);
    })
    socket?.on("opponentFound",(data)=>{
        setOpponent(data.opponentName);
        setPlayingAs(data.playingAs);
        console.log(data.opponentName);
        setStart(true)
        // nav('/dashboard/online/game',{ state: { playerName: username, opponent: data.opponentName } });
    })
    if(start && opponent){
        return <OnlineGame playerName={username} opponentName={opponent} playingAs={playingAs} socket={socket}/>
    }
    return (
        <div className="online-container">
            <label htmlFor="input">Enter username:</label>
            <input
                type="text"
                placeholder="Enter Username"
                name="input"
                id="input"
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleClick}>Play</button>
            {waiting? <p>Waiting for opponent</p>:null}
        </div>
    );
}

export default OnlineMode;
