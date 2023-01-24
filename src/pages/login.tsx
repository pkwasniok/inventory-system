import { Center, Card, Heading, Box, Text, Input, Button, Link, useToast } from '@chakra-ui/react';
import { HomeLayout, Form } from '../components';
import NextLink from 'next/link';
import { type LoginInput, loginSchema } from '../utils/schemas';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';



const Login = () => {
  const router = useRouter();
  const toast = useToast();
  const session = useSession();

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
            onSubmit={handleSubmit}
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
