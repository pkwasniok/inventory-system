import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { HomeLayout } from '@/components';
import { registerSchema } from '@/utils/schemas';
import { api } from '@/utils/api';
import { Form } from '@/features/form';

import {
  useColorModeValue,
  useToast,
  Center,
  Heading,
  Box,
  Text,
  Input,
  Link,
} from '@chakra-ui/react';



const Register = () => {
  const router = useRouter();
  const toast = useToast();

  const color = useColorModeValue('gray.600', 'gray.400');

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
          color={color}
        >
          Masz już konto? Zaloguj się <Link as={NextLink} href="/login" color="blue.600">tutaj</Link>.
        </Text>

        <Box h={10}/>

        <Form
          w={350}
          schema={registerSchema}
          onSubmit={register}
          isOutlined
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

          <Form.Submit
            colorScheme="blue"
          >
            Zarejestruj się
          </Form.Submit>
        </Form>
      </Center>
    </HomeLayout>
  );
}



export default Register;

