import './ChatWindow.css'
import { useEffect, useState, useRef , KeyboardEvent} from 'react'
import EmojiPicker, {EmojiClickData} from 'emoji-picker-react';

// ICONS
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';


import { MessageItem } from '../MessageItem';
import { listProps } from '../../types/list';
import { userdb } from '../../types/userdb';
import { listItemProps } from '../../types/chatListItem';
import { onChatContent, sendMessage } from '../../Api';

type Props = {
    user: userdb,
    data: listItemProps | undefined
}

export const ChatWindow = ({ user, data }: Props) => {

    const body = useRef<any>()

    const [openedEmoji, setOpenedEmoji] = useState<boolean>(false)
    const [text, setText] = useState('')
    const [list, setList] = useState<listProps[]>([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        setList([])
        let unsub = onChatContent(data?.chatId, setList, setUsers)
        return unsub
    }, [data?.chatId])

    useEffect(() => {
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current?.scrollHeight - body.current.offsetHeight
        }
    }, [list])

    const openEmoji = () => {
        setOpenedEmoji(true)
    }
    const closeEmoji = () => {
        setOpenedEmoji(false)
    }

    const send = () => {
        if(text !== ''){
            sendMessage(data, user.id, 'text', text, users)
            setText('')
            setOpenedEmoji(false)
        }
    }

    const handleInputKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.code === 'Enter'){
            send()
        }
    }

    const handleEmojiClick = (emojiData: EmojiClickData, e: MouseEvent) => {
        setText(text + emojiData.emoji)
    }

    return(
        <div className="chatWindow">
            <div className="chatWindow-header">
                <div className="chatWindow-headerInfo">
                    <img  src={data?.image} alt="avatar do contato"/>
                    <div className="chatWindow-headerName">{data?.title}</div>
                </div>

                <div className="chatWindow-headerButtons">
                    <div className="chatWindow-btn">
                        <SearchIcon className='chatWindow-icon'/>
                    </div>
                    <div className="chatWindow-btn">
                        <MoreVertIcon className='chatWindow-icon'/>
                    </div>
                </div>
            </div>

            <div ref={body} className="chatWindow-body">
                {list.map((item, key) => (
                    <MessageItem 
                        key={key}
                        data={item}
                        user={user}
                        messageData={data}
                    />
                ))} 
            </div>

            <div className="chatWindow-emojiArea" style={{height: openedEmoji ? '250px' : '0'}}>
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    searchDisabled
                    skinTonesDisabled
                />
            </div>

            <div className="chatWindow-footer">
                
                <div className="chatWindow-left">
                    <CloseIcon className='chatWindow-icon' 
                        onClick={closeEmoji}
                        style={{display: openedEmoji ? 'block' : 'none'}}
                    />
                    <InsertEmoticonIcon className='chatWindow-icon' 
                        onClick={openEmoji}
                        style={{color: openedEmoji ? '#329658' : ''}}
                    />
                    <AttachFileIcon className='chatWindow-icon'/>
                </div>

                <div className="chatWindow-inputArea">
                    <input 
                        type="text" 
                        placeholder='Mensagem' 
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                    />
                </div>

                <div className="chatWindow-right">
                    <MicIcon className='chatWindow-icon' style={{display: text !== '' ? 'none' : 'block'}}/>
                    <SendIcon className='chatWindow-icon'style={{display: text !== '' ? 'block' : 'none'}} onClick={send}/>
                </div>

            </div>
        </div>
    )
}