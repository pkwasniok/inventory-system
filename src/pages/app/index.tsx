import { Box, Center, Spinner, Button } from '@chakra-ui/react';
import { useSession, signOut } from 'next-auth/react';



const App = () => {
  const session = useSession({ required: true });

  if (session.status == 'loading') {
    return (
      <Center
        position="fixed"
        inset={0}
      >
        <Spinner
          size="xl"
          color="blue.600"
        />
      </Center>
    )
  }

  return (
    <Box
      position="fixed"
      inset={0}
      p={3}
    >
      <Button onClick={() => signOut({ callbackUrl: '/' })} colorScheme="red">Wylgouj się</Button>
    </Box>
  )
}



export default App;
