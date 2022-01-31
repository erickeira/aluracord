import { Box, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function Loading() {

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                }}
            >
                <Image
                    styleSheet={{
                        animation: 'rotate 1s infinite',
                    }}
                    src='https://c.tenor.com/rtY9m7EokSYAAAAM/cat-loading.gif'
                />
                <Text
                    styleSheet={{
                        fontSize: '25px',
                        maxWidth: '300px',
                        textAlign: 'center',
                        color: appConfig.theme.colors.primary["000"],
                        boxShadow: '0 0 5em rgb( 223, 184, 122)'
                    }}
                >
                    Carregando o chat...
                </Text>

            </Box>
        </>
    )
}