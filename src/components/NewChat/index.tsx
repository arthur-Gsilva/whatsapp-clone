import { useState, useEffect } from 'react';
import './NewChat.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { listItemProps } from '../../types/chatListItem';
import addUser, { addNewChat, getContactList } from '../../Api';
import { userdb } from '../../types/userdb';

type Props = {
    open: boolean
    setOpen: (arg0: boolean) => void
    user: userdb
    chatList: listItemProps[]
}

export const NewChat = ({ open, setOpen, user, chatList }: Props) => {

    const [contactList, setContactList] = useState<userdb[]>([])

    useEffect(() => {
        const getList = async () => {
            if(user !== null){
                let result = await getContactList(user.id)
                setContactList(result)
            }
        }
        getList()
    }, [user])

    const closeNewChat = () => {
        setOpen(false)
    }

    const startChat = async ( contactUser: userdb ) => {
        await addNewChat(user, contactUser)

        setOpen(false)
    }

    return(
        <div 
            className="new-chat"
            style={{left: open ? '0' : '-100%'}}
        >

            <div className="newChat-header">
                <div className="newChat-backbtn" onClick={closeNewChat}>
                    <ArrowBackIcon className='newChat-icon'/>
                </div>
                <div className="newChat-title">
                    Nova Conversa
                </div>
            </div>

            <div className="newChat-list">

                {contactList.map((item, key) => (
                    <div className="newChat-item"  key={key} onClick={()=> startChat(item)}>
                        <img className='newChat-itemAvatar' src={item.avatar} alt="contact user" />
                        <div className="newChat-itemName">
                            {item.name}
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}