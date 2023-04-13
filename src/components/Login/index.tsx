import './Login.css'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Auth } from '../../Api'

type Props = {
    onReceive: (u: any) => void
}

export const Login = ({ onReceive }: Props) => {

    const googleSignin = () => {
        const provider = new GoogleAuthProvider()

        signInWithPopup(Auth, provider)
            .then((result) => {
                onReceive(result.user)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return(
        <div className='login'>
            <img src="https://1000logos.net/wp-content/uploads/2021/05/Gmail-logo.png" alt="google logo" />

            <button onClick={googleSignin}>Logar com o Gmail</button>
        </div>
    )
}