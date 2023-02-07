import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { AppLayout } from '@/components';
import { organizationCreateSchema, type OrganizationCreateInput } from '@/schemas';
import { api } from '@/utils/api';
import UndrawSetupWizard from '@public/undraw/undraw_setup_wizard.svg';
import { Form } from '@/features/form';

import {
  useToast,
  Flex,
  Heading,
  Text,
  Box,
  Button,
  Input,
  Card,
  Image,
} from '@chakra-ui/react';

import { HiOutlinePlus } from 'react-icons/hi2';



const Wizard = () => {
  const router = useRouter();
  const toast = useToast();
  const { mutateAsync: createOrganization } = api.organization.create.useMutation();

  const handleSubmit = async (input: OrganizationCreateInput) => {
    const organization = await createOrganization(input);

    toast({
      status: 'success',
      title: 'Utworzono organizację',
    });

    router.push(`/app/${organization.id}`);
  }

  return (
    <AppLayout title="Tworzenie organizacji">
      <Flex
        h="100%"
        w="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading
          m={2}
        >
          Tworzenie organizacji
        </Heading>

        <Text
          color="gray.600"
        >
          Zanim zaczniesz korzystać z aplikacji musisz utworzyć profil organizacji.
        </Text>

        <Image
          as={NextImage}
          w={280}
          alt=""
          src={UndrawSetupWizard}
          mt={10}
          mb={20}
        />

        <Form
          w={350}
          schema={organizationCreateSchema}
          onSubmit={handleSubmit}
          isOutlined
        >
          <Form.Field
            name="name"
            label="Nazwa organizacji"
          >
            <Input/>
          </Form.Field>

          <Form.Submit
            colorScheme="blue"
            rightIcon={<HiOutlinePlus size={20}/>}
          >
            Utworz organizację
          </Form.Submit>
        </Form>
      </Flex>
    </AppLayout>
  );
}



export default Wizard;
