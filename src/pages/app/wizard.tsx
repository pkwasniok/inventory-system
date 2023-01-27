import { AppLayout, Form } from '../../components';
import { Flex, Heading, Text, Box, Button, Input, Card, Image, useToast } from '@chakra-ui/react';
import { HiOutlinePlus } from 'react-icons/hi2';
import { useRouter } from 'next/router';
import { organizationCreateSchema, type OrganizationCreateInput } from '../../utils/schemas';
import { api } from '../../utils/api';
import NextImage from 'next/image';
import UndrawSetupWizard from '../../../public/undraw/undraw_setup_wizard.svg';



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
    <AppLayout title="Konfiguracja aplikacji">
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

        <Card
          variant="outline"
          p={6}
        >
          <Form
            w={320}
            schema={organizationCreateSchema}
            onSubmit={handleSubmit}
          >
            <Form.Field
              name="name"
              label="Nazwa organizacji"
            >
              <Input/>
            </Form.Field>

            <Box h={2}/>

            <Button
              colorScheme="blue"
              type="submit"
              rightIcon={<HiOutlinePlus size={20}/>}
            >
              Utworz organizację
            </Button>
          </Form>
        </Card>
      </Flex>
    </AppLayout>
  );
}



export default Wizard;
