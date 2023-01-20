import { type NextPage } from 'next';
import { Center, Flex, Input, Button, Heading, useToast } from '@chakra-ui/react';
import { HomeLayout, Form, NextLink } from '../components';
import { registerSchema } from '../utils/schemas';
import { useRouter } from 'next/navigation';
import { api } from '../utils/api';



const Register: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  const { mutate: register } = api.user.register.useMutation({
    onError: (error) => {
      if (error.data?.code == 'CONFLICT') {
        toast({
          title: 'Nie udało się zarejestrować',
          description: 'Podany adres email jest już zajęty',
          status: 'error',
          isClosable: true,
        });
      }
    },
    onSuccess: () => {
      toast({
        title: 'Pomyślnie zarejestrowano',
        description: 'Teraz możesz się zalogować',
        status: 'success',
        isClosable: true,
      });

      router.push('/login');
    }
  });

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
            onSubmit={register}
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
              Zarejestruj się
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
