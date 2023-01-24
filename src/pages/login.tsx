import { Center, Card, Heading, Box, Text, Input, Button, Link } from '@chakra-ui/react';
import { HomeLayout, Form } from '../components';
import NextLink from 'next/link';



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

        <Box h={12}/>

        <Card
          variant="outline"
          p={6}
        >
          <Form
            w={320}
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

            <Box h={5}/>

            <Button
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
