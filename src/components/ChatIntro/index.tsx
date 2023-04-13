import './ChatIntro.css'

// @ts-ignore
import Banner from '../../assets/images/banner.png'

export const ChatIntro = () => {
    return(
        <div className='chatIntro'>
            <img src={Banner} alt="" />
            <h1>Mantenha seu celular conectado</h1>
            <h2>O whatsapp conecta ao seu telefone para sincronizar sua mensagens. <br /> Para reduzir o uso de dados, conecte seu telefone a uma rede Wi-fi.</h2>
        </div>
    )
}