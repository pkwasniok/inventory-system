import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { HomeLayout } from '@/components';
import { type LoginInput, loginSchema } from '@/utils/schemas';
import { Form } from '@/features/form';

import {
  useColorModeValue,
  Center,
  Heading,
  Box,
  Text,
  Input,
  Link,
  useToast
} from '@chakra-ui/react';



const Login = () => {
  const router = useRouter();
  const toast = useToast();
  const session = useSession();

  const color = useColorModeValue('gray.600', 'gray.400');

  // redirect user to /app when session is valid
  useEffect(() => {
    if (session.status == 'authenticated') {
      router.push('/app');
    }
  }, [session, router]);

  const handleSubmit = async (data: LoginInput) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.ok == true) {
      toast({
        status: 'success',
        title: 'Zalogowano pomyślnie',
      });
      router.push('/app')
    } else {
      if (result?.error == 'CredentialsSignin' && result?.status == 401) {
        toast({
          status: 'error',
          title: 'Nie udało się zalogować',
          description: 'Adres email lub hasło są nieprawidłowe',
        });
      } else {
        toast({
          status: 'error',
          title: 'Nie udało się zalogować',
          description: 'Wystąpił nieznany błąd',
        });
      }
    }
  }

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
          color={color}
        >
          Nie masz konta? Zarejestruj się <Link as={NextLink} href="/register" color="blue.600">tutaj</Link>.
        </Text>

        <Box h={10}/>

        <Form
          w={350}
          schema={loginSchema}
          onSubmit={handleSubmit}
          isOutlined
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

          <Form.Submit
            colorScheme="blue"
          >
            Zaloguj się
          </Form.Submit>
        </Form>
      </Center>
    </HomeLayout>
  );
}



export default Login;
