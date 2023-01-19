import { type NextPage } from "next";
import HomeLayout from "../components/HomeLayout";
import { Center, Flex, FormControl, FormLabel, Input, Button, Heading } from "@chakra-ui/react";



const Login: NextPage = () => {
  return (
    <HomeLayout>
      <Center
        flex={1}
      >
        <Flex
          w="320px"
          direction="column"
          gap={5}
        >
          <Heading
            textAlign="center"
            mb={10}
          >
            Logowanie
          </Heading>

          <FormControl isRequired>
            <FormLabel>Adres email</FormLabel>
            <Input type="email"/>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Hasło</FormLabel>
            <Input type="password"/>
          </FormControl>

          <Button
            colorScheme="blue"
          >
            Zaloguj się
          </Button>

          <hr style={{marginLeft: '10px', marginRight: '10px'}}/>

          <Button
            variant="ghost"
            as="a"
            href="/register"
          >
            Nie masz konta? Zarejestruj się
          </Button>
        </Flex>
      </Center>
    </HomeLayout>
  );
};



export default Login;
