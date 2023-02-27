import React from 'react'
import List from '@mui/material/List';
import { Chat } from './index'
import { styled } from '@mui/material/styles';

const ChatList = styled(List)(({ theme }) => ({
    height: 400,
    padding: '0',
    overflow: 'auto'
}));


const Chats = (props) => {
    return (
        <ChatList sx={{ width: '100%', bgcolor: 'background.paper' }} id={"scroll-area"}>
            {props.chats.map((chat, index) => {
                return (
                    < Chat text={chat.text} type={chat.type} key={index.toString()} />
                )
            })}
        </ChatList>
    )
}

export default Chats;