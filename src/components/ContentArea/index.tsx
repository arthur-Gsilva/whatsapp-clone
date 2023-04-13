import { ChatIntro } from '../ChatIntro'
import './Content.css'
import { ChatWindow } from '../ChatWindow'
import { listItemProps } from '../../types/chatListItem'
import { userdb } from '../../types/userdb'

type Props = {
    Data: listItemProps | undefined,
    user: userdb
}

export const ContentArea = ({ Data, user }: Props) => {

    return(
        <main className="content-area">

            {Data !== undefined &&
                <ChatWindow 
                    user={user}
                    data={Data}
                />
            }

            {Data === undefined &&
                <ChatIntro />
            }

           
        </main>
    )
}