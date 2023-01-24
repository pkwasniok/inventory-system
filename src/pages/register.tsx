import { Center, Card, Heading, Box, Text, Input, Button, Link } from '@chakra-ui/react';
import { HomeLayout, Form } from '../components';
import NextLink from 'next/link';
import { registerSchema } from '../utils/schemas';



const Register = () => {
  return (
    <HomeLayout>
      <Center
        h="100%"
        flexDirection="column"
      >
        <Heading
          m={2}
        >
          Rejestracja
        </Heading>

        <Text
          color="gray.600"
        >
          Masz już konto? Zaloguj się <Link as={NextLink} href="/login" color="blue.600">tutaj</Link>.
        </Text>

        <Box h={10}/>

        <Card
          variant="outline"
          p={6}
        >
          <Form
            w={320}
            schema={registerSchema}
          >
            <Form.Field
              name="name"
              label="Imię i nazwisko"
            >
              <Input/>
            </Form.Field>

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
              Zarejestruj się
            </Button>
          </Form>
        </Card>
      </Center>
    </HomeLayout>
  );
}



export default Register;

