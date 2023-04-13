import './Sidebar.css'

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

import { useState, useEffect } from 'react'
import { ChatListItem } from '../ChatListItem';
import { listItemProps } from '../../types/chatListItem';
import { NewChat } from '../NewChat';
import { userdb } from '../../types/userdb';
import { onChatList } from '../../Api';

type Props = {
    sendData: (arg0: listItemProps) => void,
    user: userdb
}

export const Sidebar = ({ sendData, user }: Props) => {

    const [chatList, setChatList] = useState<listItemProps[]>([])
    
    const [activeChat, setActiveChat] = useState<any>({})

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const openNewChat = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        if(user !== null){
            let unsub = onChatList(user.id, setChatList)

            return unsub
        }
    }, [user])

    return(
        <aside className="sidebar">

            <NewChat
                user={user}
                chatList={chatList}
                open={isOpen} 
                setOpen={setIsOpen}
            />

            <header className='header'>
                <img className='header-avatar' src={user.avatar} alt="user avatar" referrerPolicy='no-referrer'/>

                <div className="header-buttons">
                    <div className="header-btn">
                        <DonutLargeIcon className='header-icon'/>
                    </div>
                    <div className="header-btn" onClick={openNewChat}>
                        <ChatIcon className='header-icon'/>
                    </div>
                    <div className="header-btn">
                        <MoreVertIcon className='header-icon'/>
                    </div>
                </div>
            </header>

            <div className="search">
                <div className="search-input">
                    <SearchIcon className='header-icon'/>
                    <input type="search" placeholder='Procurar ou começar uma nova conversa' />
                </div>
            </div>

            <div className="chatlist">
                {chatList.map((item: listItemProps, key) => (
                    <ChatListItem 
                        key={key}
                        data={item}
                        active={activeChat.chatId === chatList[key].chatId}
                        onClick={() => {
                            setActiveChat(chatList[key])
                            sendData(activeChat)
                        }}
                    />
                ))}
            </div>

        </aside>
    )
}