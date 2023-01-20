import { type NextPage } from 'next';
import { Center, Heading } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';



const App: NextPage = () => {
  const session = useSession({ required: true });

  if (session.status != 'authenticated') {
    return (
      <Center
        w="screen"
        h="screen"
      >
        <Heading>Loading</Heading>
      </Center>
    )
  }

  return (
    <Center
      w="screen"
      h="screen"
    >
      <Heading>Welcome to application</Heading>
    </Center>
  )
}



export default App;
