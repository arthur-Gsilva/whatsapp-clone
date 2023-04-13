import { useState } from 'react';
import './App.css'
import { ContentArea } from './components/ContentArea';
import { Sidebar } from './components/Sidebar';
import { listItemProps } from './types/chatListItem';
import { Login } from './components/Login';
import addUser from './Api';
import { userdb } from './types/userdb';



const App = () => {

    const [data, setData] = useState<listItemProps>()

    const [user, setUser] = useState<userdb | null>(null)

    const receiveData = (sonData: listItemProps) => {
        setData(sonData)
    }


    const handleLoginData = async (u: any) => {
        let newUser: userdb = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL
        }

        await addUser(newUser)
        setUser(newUser)
    }

    if(user === null){
        return(<Login onReceive={handleLoginData}/>)
    }

    return(
        <div className="app">
            <Sidebar sendData={receiveData} user={user}/>

            <ContentArea Data={data} user={user}/>
        </div>
    )
}

export default App;