import { Center, Card, Heading, Box, Text, Input, Button, Link } from '@chakra-ui/react';
import { HomeLayout, Form } from '../components';
import NextLink from 'next/link';
import { loginSchema } from '../utils/schemas';



const Login = () => {
  return (
    <HomeLayout>
      <Center
        h="100%"
        flexDirection="column"
      >
        <Heading
          m={2}
        >
          Logowanie
        </Heading>

        <Text
          color="gray.600"
        >
          Nie masz konta? Zarejestruj się <Link as={NextLink} href="/register" color="blue.600">tutaj</Link>.
        </Text>

        <Box h={10}/>

        <Card
          variant="outline"
          p={6}
        >
          <Form
            w={320}
            schema={loginSchema}
          >
            <Form.Field
              name="email"
              label="Adres email"
            >
              <Input/>
            </Form.Field>

            <Form.Field
              name="password"
              label="Hasło"
            >
              <Input
                type="password"
              />
            </Form.Field>

            <Box h={2}/>

            <Button
              type="submit"
              colorScheme="blue"
            >
              Zaloguj się
            </Button>
          </Form>
        </Card>
      </Center>
    </HomeLayout>
  );
}



export default Login;
