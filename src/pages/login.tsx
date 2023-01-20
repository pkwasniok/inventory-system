import { type NextPage } from 'next';
import { HomeLayout, Form, NextLink } from '../components';
import { Center, Flex, Heading, Input, Button, useToast } from '@chakra-ui/react';
import { type LoginInput, loginSchema } from '../utils/schemas';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';



const Login: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (data: LoginInput) => {
    const result = await signIn('credentials', { redirect: false, email: data.email, password: data.password });

    if (result?.ok == true) {
      toast({
        title: 'Zalogowano pomyślnie',
        status: 'success',
        isClosable: true,
      })
    } else {
      toast({
        title: 'Nie udało się zalogować',
        description: 'Adres email lub hasło są nieprawidłowe',
        status: 'error',
        isClosable: true,
      });
    }
  }

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
            onSubmit={handleSubmit}
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
