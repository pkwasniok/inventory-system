import { type NextPage } from "next";
import { HomeLayout, Form, NextLink } from '../components';
import { Center, Flex, Heading, Input, Button } from "@chakra-ui/react";
import { loginSchema } from '../utils/schemas';



const Login: NextPage = () => {
  return (
    <HomeLayout>
      <Center
        flex={1}
      >
        <Flex
          w="320px"
          direction="column"
          alignItems="center"
          gap={5}
        >
          <Heading
            textAlign="center"
            mb={10}
          >
            Logowanie
          </Heading>

          <Form
            schema={loginSchema}
            onSubmit={(data) => console.log(data)}
            w={320}
          >
            <Form.Field
              name="email"
              label="Adres email"
              isRequired
            >
              <Input/>
            </Form.Field>

            <Form.Field
              name="password"
              label="Hasło"
              isRequired
            >
              <Input type="password"/>
            </Form.Field>

            <Button
              type="submit"
            >
              Zaloguj się
            </Button>
          </Form>

          <Button
            w="100%"
            variant="ghost"
            as={NextLink}
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
