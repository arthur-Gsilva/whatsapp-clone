import { useState, useEffect } from 'react'

import { listProps } from '../../types/list'
import { userdb } from '../../types/userdb'
import './MessageItem.css'
import { listItemProps } from '../../types/chatListItem'

type Props = {
    data: listProps,
    user: userdb,
    messageData: listItemProps | undefined
}

export const MessageItem = ({ data, user, messageData }: Props) => {


    const [time, setTime] = useState('')

    useEffect(() => {
        if(messageData?.lastMessageDate > 0){
            let now = new Date(messageData?.lastMessageDate.seconds * 1000)
            let hours = now.getHours()
            let minutes = now.getMinutes()
            hours = hours  < 10 ? 0+ hours : hours
            minutes = minutes  < 10 ? 0+ minutes : minutes
            setTime(`${hours}:${minutes}`)
        }
    }, [data])

    return(
        <div 
            className='message-line'
            style={{justifyContent: user.id === data.author ? 'flex-end' : 'flex-start'}}
        >

            <div 
                className="message-item"
                style={{backgroundColor: user.id === data.author ? '#dcf8c6' : '#fff'}}
            >

                <p className="message-text">
                    {data.body}
                </p>
                <div className="message-date">{time}</div>

            </div>

        </div>
    )
}