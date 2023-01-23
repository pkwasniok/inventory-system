import { type NextPage } from 'next';
import { Center, Flex, Heading, Button } from '@chakra-ui/react';
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
    <Flex
      position="fixed"
      inset={0}
      direction="row"
    >
      <Flex
        h="screen"
        w="300px"
        bg="blue.500"
        direction="column"
        alignItems="center"
        gap={5}
        p={5}
      >
        <Button
          variant="ghost"
          color="white"
          colorScheme="whiteAlpha"
          w="100%"
          justifyContent="start"
        >
          Dashboard
        </Button>
      </Flex>
    </Flex>
  )
}



export default App;
