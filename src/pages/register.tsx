import { type NextPage } from 'next';
import { Center, Flex, Input, Button, Heading } from '@chakra-ui/react';
import { HomeLayout, Form, NextLink } from '../components';
import { registerSchema } from '../utils/schemas';



const Register: NextPage = () => {
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
            Rejestracja
          </Heading>

          <Form
            schema={registerSchema}
            onSubmit={(data) => console.log(data)}
            w={320}
          >
            <Form.Field
              name="name"
              label="Imię i nazwisko"
              isRequired
            >
              <Input/>
            </Form.Field>

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
