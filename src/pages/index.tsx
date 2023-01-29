import { type NextPage } from 'next';
import { HomeLayout } from '@/components';
import { Form } from '@/features/form';

import {
  Center,
  Input
} from '@chakra-ui/react';



const Home: NextPage = () => {
  return (
    <HomeLayout>
      <Form w={320} isOutlined>
        <Form.Field label="Adres email" name="email">
          <Input/>
        </Form.Field>

        <Form.Field label="Hasło">
          <Input/>
        </Form.Field>

        <Form.Submit colorScheme="blue" align="right">Zaloguj się</Form.Submit>
      </Form>
    </HomeLayout>
  );
};



export default Home;
