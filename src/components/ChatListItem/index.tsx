import { listItemProps } from '../../types/chatListItem'
import './ChatListItem.css'

import { useState, useEffect } from 'react'

type Props = {
    onClick: () => void,
    active: boolean,
    data: listItemProps
}


export const ChatListItem = ({ onClick, active, data }: Props) => {

    const [time, setTime] = useState('')

    useEffect(() => {
        if(data.lastMessageDate > 0){
            let now = new Date(data.lastMessageDate.seconds * 1000)
            let hours = now.getHours()
            let minutes = now.getMinutes()
            hours = hours  < 10 ? 0+ hours : hours
            minutes = minutes  < 10 ? 0+ minutes : minutes
            setTime(`${hours}:${minutes}`)
        }
    }, [data])



    return(
        <div 
            className={`chatListItem ${active ? 'active' : ''}`} 
            onClick={onClick}
        >

            <img src={data.image} alt="contact-avatar" className='chatListItem-avatar'/>

            <div className="chatListItem-lines">
                <div className="chatListItem-line">
                    <div className="chatListItem-name">{data.title}</div>
                    <div className="chatListItem-date">{time}</div>
                </div>
                <div className="chatListItem-line">
                    <div className="chatListItem-lastMsg">
                        <p>{data.lastMessage}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}