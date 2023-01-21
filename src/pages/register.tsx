import { type NextPage } from 'next';
import { Center, Flex, Input, Button, Heading, useToast, Card } from '@chakra-ui/react';
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
          <Card p={5} borderRadius={6} variant="elevated">
            <Heading
              size="lg"
              textAlign="center"
              mb={8}
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
                <Input
                  variant="filled"
                />
              </Form.Field>

              <Form.Field
                name="email"
                label="Adres email"
                isRequired
              >
                <Input
                  variant="filled"
                />
              </Form.Field>

              <Form.Field
                name="password"
                label="Hasło"
                isRequired
              >
                <Input
                  variant="filled"
                  type="password"
                />
              </Form.Field>

              <Button
                type="submit"
                colorScheme="blue"
                mt={5}
              >
                Zarejestruj się
              </Button>
            </Form>
          </Card>
        </Flex>
      </Center>
    </HomeLayout>
  );
};



export default Register;
