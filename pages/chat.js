import { Box, Text, TextField, Image, Button, Icon} from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/componentes/ButtonSendStickers';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQwOTQwNCwiZXhwIjoxOTU4OTg1NDA0fQ.aRGidpO-ArrYzWrQ5RNBqz0vIFjR5qplg9dor6kgigQ';
const SUPABASE_URL = 'https://jkazvpzglcswgqmgrrjc.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
      .from('mensagens')
      .on('INSERT', (respostaLive) => {
        adicionaMensagem(respostaLive.new);
      })
      .subscribe();
  }

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    
    React.useEffect(() => {
    supabaseClient
        .from('mensagens')
        .select('*')
        .order('created_at', {ascending: false})
        .then(({data}) => {
          console.log(data);
          setListaDeMensagens(data)
        });

        const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
            setListaDeMensagens((valorAtualDaLista) => {
              return [
                novaMensagem,
                ...valorAtualDaLista,
              ]
            });
          });
      
          return () => {
            subscription.unsubscribe();
          }
    
    }, []);
 

    


    function handleNovaMensagem(novaMensagem){
        if(novaMensagem != ''){
        const mensagem   = {
            // id: listaDeMensagens.length + 1,
            de: usuarioLogado, 
            texto: novaMensagem,

        };
        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({data}) => {

            });

        setMensagem('');
    }
    }


    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://fyre.cdn.sewest.net/maple/60d3940f7ad2d100193d493d/mgg_news_announcement_mainimage-jKUXpKl13.jpg?width=1400&quality=80)`,
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

                    <MessageList mensagens={listaDeMensagens} /> 
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return(
                            <li key={mensagemAtual.id} >
                                {mensagemAtual.de} : {mensagemAtual.texto}  
                            </li>
                        )
                    })} */}

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
                    padding: '6px 8px',
                    borderRadius: '5px',
                    fontSize: '16px',
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
                iconName='Circle'
                label='Online'
                style={{
                    color: 'green',
                    backgroundColor: 'none',
                }}
                styleSheet={{
                    backgroundColor: appConfig.theme.colors.neutrals["700"],
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[800]
                    },
                    focus: {
                        backgroundColor: appConfig.theme.colors.neutrals[700]
                    }
                }}

                />
                    
                
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

    function mostrarFoto(mensagemFoto){
        console.log(mensagemFoto)
        return(
            <Image 
                           src={`https://github.com/${mensagemFoto}.png`}
                           styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '5px',
                            position: 'absolute',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            width: {
                              xs: '150px',
                              sm: '150px',
                            },
                            height: '150px',
                            left: '50px', 
                            top: '10px',
                            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
                        }}/>
        )
    }

    function handleExcluirMensagem(mensagemRemover){
        supabaseClient
        .from('mensagens')
        .delete()
        .match({id : mensagemRemover.id})
        .then(({data}) => {
        });
    }
    
    const [isOpen, setOpenState] = React.useState('');
    console.log('MessageList', props);
    return (
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
            {props.mensagens.map((mensagem) =>{
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
                            onClick={() => setOpenState(!isOpen)}
                        />
                        {isOpen && (
                           mostrarFoto(mensagem.de)
                        )}
                        
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
    )
}