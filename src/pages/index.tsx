import { type NextPage } from 'next';
import { HomeLayout } from '@/components';
import { Form } from '@/features/form';
import { loginSchema } from '@/utils/schemas';

import {
  Center,
  Input
} from '@chakra-ui/react';



const Home: NextPage = () => {
  return (
    <HomeLayout>
      <Form w={320} schema={loginSchema} onSubmit={() => console.log('Ok')} isOutlined>
        <Form.Field label="Adres email" name="email">
          <Input/>
        </Form.Field>

        <Form.Field label="Hasło" name="password">
          <Input/>
        </Form.Field>

        <Form.Submit colorScheme="blue">Zaloguj się</Form.Submit>
      </Form>
    </HomeLayout>
  );
};



export default Home;
