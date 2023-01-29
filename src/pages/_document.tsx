import { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '@/theme';



const Document = () => {
  return (
    <Html lang="pl">
      <Head/>

      <body>
        {/* This component is needed for changing color mode in ChakraUI */}
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>

        {/* Those components are from Next.js */}
        <Main/>
        <NextScript/>
      </body>
    </Html>
  );
}



export default Document;
