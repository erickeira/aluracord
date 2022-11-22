import { Box, Text, TextField, Image, Button, Icon} from '@skynexui/components';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { ButtonSendSticker } from '../src/componentes/ButtonSendStickers';
import { Loading } from '../src/componentes/Loading';
import { Scrollbar } from "react-scrollbars-custom";

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const [loading, setLoading] = React.useState(false);


    useEffect(() =>{
        setLoading(false)
    },[])

    function handleExcluirMensagem(mensagemRemover){
        let novaListaDeMensagens = listaDeMensagens.filter(mensagem => mensagem.id != mensagemRemover.id)   
        setListaDeMensagens(novaListaDeMensagens)
    }


    function handleNovaMensagem(novaMensagem){
        if(novaMensagem == '') return
        const mensagemObj   = {
            id: listaDeMensagens.length + 1,
            de: usuarioLogado, 
            texto: novaMensagem,

        };
        let novaListaDeMensagens = listaDeMensagens
        novaListaDeMensagens.unshift(mensagemObj)
        setListaDeMensagens(novaListaDeMensagens)
        setMensagem('');
    }

    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://cdnb.artstation.com/p/assets/images/images/024/538/827/original/pixel-jeff-clipa-s.gif?1582740711)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                    opacity: '97%',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',

                    }}
                >
                    {
                         !loading ? <MessageList mensagens={listaDeMensagens} deleteMessage={handleExcluirMensagem}  />
                        : <Loading />
                    }
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) =>{
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if(event.key === "Enter"){ 
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                            
                        />
            
              <Button
              iconName='paperPlane'
                label=''
                style={{
                    borderRadius: '0%',
                    height: '44px',
                    padding: '6px 8px ',
                    borderRadius: '5px',
                    fontSize: '15px',
                    marginBottom: '8px',
                }}
                styleSheet={{
                    backgroundColor: appConfig.theme.colors.primary[600],
                    marginRight: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.primary[700]
                    },
                    focus: {
                        backgroundColor: appConfig.theme.colors.primary[700]
                    }
                }}
                onClick={(event) => {
                    handleNovaMensagem(mensagem);
                }}
              />
                <ButtonSendSticker
                onStickerClick={(sticker) => {
                    handleNovaMensagem(':sticker:' + sticker);
                }}
                />
            
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header(username) {

    return (
        <>
             
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat  
                </Text>
                
                    
                   
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Sair'
                    href="/"
                />
            </Box>
        </>
    )
}


function MessageList(props) {
    const handleExcluirMensagem = props.deleteMessage
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
 
    return (
        <Scrollbar style={{}}>
        <Box
            tag="ul"    
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                heigth:'100%',
            
            }}

        >
            {props.mensagens?.map((mensagem) =>{
                return(
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                    <Box
                        styleSheet={{
                            marginBottom: '8px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                                hover: {
                                width: '22px',
                                height: '22px',
                                }
                            }}
                            src={`https://github.com/${mensagem.de}.png`}
                        
                        />
                        
                        
                        <Text tag="strong">
                            {mensagem.de}
                        </Text>
                        <Text
                            styleSheet={{
                                fontSize: '10px',
                                marginLeft: '8px',
                                color: appConfig.theme.colors.neutrals[300],
                            }}
                            tag="span"
                        >
                            {(new Date().toLocaleDateString())}
                        </Text>
                     
                    {mensagem.de.toLowerCase() == usuarioLogado.toLowerCase() ?
                    <Button
                        iconName="Trash"                       
                        variant='tertiary'
                        colorVariant='neutral'   
                        style={{
                            borderRadius: '0%',
                            height: '44px',
                            padding: '6px 8px',
                            borderRadius: '5px',
                            fontSize: '16px',
                            marginBottom: '8px',                          
                        position: 'relative',
                            float: 'right',
                        }} 
                        styleSheet={{
                            marginRight: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.primary[1000]
                            },
                            focus: {
                                backgroundColor: appConfig.theme.colors.primary[1000]
                            }
                        }}
                        onClick={() => {
                            handleExcluirMensagem(mensagem);
                        }}
                    /> 
                    : ""
                    }      
                        
                    </Box>

                        {mensagem.texto.startsWith(':sticker:')
                        ?(
                            <Image  
                            src={mensagem.texto.replace(':sticker:', '')}
                            style={{
                                maxWidth: '100px'
                            }}
                            />
                        )
                        :(
                            mensagem.texto

                        )}


                </Text>
                )
            })}
           
        </Box>
        </Scrollbar>
    )
}