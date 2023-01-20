import { type NextPage } from "next";
import HomeLayout from "../components/HomeLayout";
import { Center, Flex, FormControl, FormLabel, Input, Button, Heading } from "@chakra-ui/react";
import NextLink from "../components/NextLink";



const Register: NextPage = () => {
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
            Rejestracja
          </Heading>

          <FormControl isRequired>
            <FormLabel>Imię i nazwisko</FormLabel>
            <Input type="name"/>
          </FormControl>

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
            Zarejestruj się
          </Button>

          <Button
            variant="ghost"
            as={NextLink}
            href="/login"
          >
            Masz już konto? Zaloguj się
          </Button>
        </Flex>
      </Center>
    </HomeLayout>
  );
};



export default Register;
