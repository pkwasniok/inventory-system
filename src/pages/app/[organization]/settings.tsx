import { useRouter } from 'next/router';

import { AppLayout } from '@/components';

import { api } from '@/utils/api';

import { Form } from '@/features/form';

import { organizationUpdateSchema, OrganizationUpdateInput } from '@/schemas';

import {
  useToast,
  Center,
  Flex,
  Heading,
  Divider,
  Input,
  Button,
} from '@chakra-ui/react';



const OrganizationSettings = () => {
  const router = useRouter();
  const query = router.query as { organization: string };
  const toast = useToast();

  const organization = api.organization.getById.useQuery(query.organization);
  const { mutate: updateOrganization } = api.organization.update.useMutation({
    onSuccess: () => {
      organization.refetch();
      toast({
        status: 'success',
        title: 'Zapisano zmiany',
      });
    },
    onError: (error) => {
      if (error.data?.code === 'FORBIDDEN') {
        toast({
          status: 'error',
          title: 'Nie udało się zapisać',
          description: 'Nie posiadasz uprawnień do wykonania tej operacji',
        });
      }
    }
  });
  const { mutate: deleteOrganization } = api.organization.delete.useMutation({
    onSuccess: () => {
      router.push('/app');
      toast({
        status: 'success',
        title: 'Zapisano zmiany',
      });
    },
    onError: (error) => {
      if (error.data?.code === 'FORBIDDEN') {
        toast({
          status: 'error',
          title: 'Nie udało się zapisać',
          description: 'Nie posiadasz uprawnień do wykonania tej operacji',
        });
      }
    }
  });

  return (
    <AppLayout
      title="Ustawienia"
      organization={organization.data ?? undefined}
      loading={organization.status == 'loading'}
    >
      <Center
        h="100%"
      >
        <Flex
          maxW="1200px"
          w="100%"
          h="100%"
          p={6}
          direction="column"
          gap={3}
        >
          <Heading
            size="md"
            mb={6}
          >
            Ustawienia organizacji
          </Heading>

          <Heading
            size="sm"
          >
            Informacje
          </Heading>

          <Divider/>

          <Form
            schema={organizationUpdateSchema}
            defaultValues={organization.data as OrganizationUpdateInput}
            onSubmit={updateOrganization}
          >
            <Form.Value name="id"/>

            <Form.Field name="name">
              <Input/>
            </Form.Field>

            <Form.Submit
              align="right"
              colorScheme="blue"
            >
              Zapisz
            </Form.Submit>
          </Form>

          {/* <Heading
            size="sm"
          >
            Członkowie
          </Heading>

          <Divider/> */}

          <Heading
            size="sm"
            mt={10}
          >
            Strefa niebezpieczna
          </Heading>

          <Divider/>

          <Flex
            direction="row"
            gap={6}
          >
            <Button
              colorScheme="red"
              onClick={() => deleteOrganization(organization.data!.id)}
            >
              Usuń organizację
            </Button>
          </Flex>
        </Flex>
      </Center>
    </AppLayout>
  );
}



export default OrganizationSettings;
