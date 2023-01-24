import { Center, Card, Heading, Box, Text, Input, Button, Link, useToast } from '@chakra-ui/react';
import { HomeLayout, Form } from '../components';
import NextLink from 'next/link';
import { registerSchema } from '../utils/schemas';
import { api } from '../utils/api';
import { useRouter } from 'next/navigation';



const Register = () => {
  const router = useRouter();
  const toast = useToast();

  const { mutate: register } = api.user.register.useMutation({
    onSuccess: () => {
      toast({
        status: 'success',
        title: 'Pomyślnie zarejestrowano',
        description: 'Teraz możesz się zalogować',
      });
      router.push('/login');
    },
    onError: (error) => {
      if (error.data?.code == 'CONFLICT') {
        toast({
          status: 'error',
          title: 'Nie udało się zarejestrować',
          description: 'Podany adres email jest zajęty',
        });
      } else {
        toast({
          status: 'error',
          title: 'Nie udało się zarejestrować',
          description: 'Wystąpił nieznany błąd',
        });
      }
    }
  });

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
            onSubmit={register}
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

