import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'
import 'firebase/compat/firestore'

import firebaseConfig from './firebaseConfig'
import { userdb } from './types/userdb'
import { listItemProps } from './types/chatListItem'


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()

export const Auth = getAuth(firebaseApp)

const addUser = async (u: userdb) => {
    await db.collection('users').doc(u.id).set({
        name: u.name,
        avatar: u.avatar
    }, {merge: true})
}

export const getContactList = async (userId: any) => {
    let list: userdb[] = []

    let results = await db.collection('users').get()
    results.forEach(result => {
        let data = result.data()

        if(result.id !== userId){
            list.push({
                id: result.id,
                name: data.name,
                avatar: data.avatar
            })
        }
    })

    return list;
}

export const addNewChat = async (user: userdb, user2: userdb) => {
    let newChat = await db.collection('chats').add({
        messages: [],
        users: [user.id, user2.id]
    })

    db.collection('users').doc(user.id).update({
        chats: firebase.firestore.FieldValue.arrayUnion({
            chatId: newChat.id,
            title: user2.name,
            image: user2.avatar,
            with: user2.id
        })
    })

    db.collection('users').doc(user2.id).update({
        chats: firebase.firestore.FieldValue.arrayUnion({
            chatId: newChat.id,
            title: user.name,
            image: user.avatar,
            with: user.id
        })
    })
}

export const onChatList = (userId: string, setChatList: (arg0: any) => void) => {
    return db.collection('users').doc(userId).onSnapshot((doc) => {
        if(doc.exists){
            let data: any = doc.data()

            if(data.chats){
                let chats = [...data.chats]

                chats.sort((a, b) => {
                    if(a.lastMessage === undefined){
                        return -1
                    }
                    if(a.lastMessageDate.seconds < b.lastMessageDate.seconds){
                        return 1
                    } else{
                        return -1
                    }
                })

                setChatList(chats)
            }
        }
    })
}

export const onChatContent = (
        chatId: string | undefined, 
        setList: (arg0: any) => void,
        setUsers: (arg0: any) => void
    ) => {
    return db.collection('chats').doc(chatId).onSnapshot((doc) => {
        if(doc.exists){
            let data: any = doc.data()
            setList(data.messages)
            setUsers(data.users)
        }
    })
}

export const sendMessage = async (
    chatData: listItemProps | undefined,
    userId: string,
    type: string,
    body: string,
    users: string[]
) => {

    let now = new Date()

    db.collection('chats').doc(chatData?.chatId).update({
        messages: firebase.firestore.FieldValue.arrayUnion({
            type,
            author: userId,
            body,
            date: now
        })
    })

    for(let i in users){
        let u = await db.collection('users').doc(users[i]).get()
        let uData: any = u.data()
        if(uData.chats){
            let chats = [...uData.chats]

            for(let e in chats){
                if(chats[e].chatId == chatData?.chatId){
                    chats[e].lastMessage = body
                    chats[e].lastMessageDate = now
                }
            }

            await db.collection('users').doc(users[i]).update({
                chats
            })
        }
    }
}

export default addUser