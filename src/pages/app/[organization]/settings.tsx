import { AppLayout, Form } from '../../../components';
import { useRouter } from 'next/router';
import { api } from '../../../utils/api';
import { organizationCreateSchema } from '../../../utils/schemas';

import {
  Center,
  Flex,
  Heading,
  Divider,
  Input,
  Button,
} from '@chakra-ui/react';

import {
  HiOutlineCheck
} from 'react-icons/hi2';



const OrganizationSettings = () => {
  const router = useRouter();
  const query = router.query as { organization: string };

  const organization = api.organization.getById.useQuery(query.organization);

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
          h="100%"
          w="100%"
          px={3}
          py={10}
          direction="column"
          alignItems="center"
          gap={3}
        >
          <Flex
            w="100%"
            px={3}
            direction="row"
          >
            <Heading
              size="md"
            >
              Podstawowe informacje
            </Heading>
          </Flex>

          <Divider/>

          <Form
            w={420}
            defaultValues={organization.data}
            schema={organizationCreateSchema}
          >
            <Form.Field
              name="name"
              label="Nazwa organizacji"
            >
              <Input/>
            </Form.Field>

            <Flex
              w="100%"
              mt={3}
              direction="row"
              alignItems="center"
              justifyContent="end"
            >
              <Button
                size="sm"
                colorScheme="blue"
                rightIcon={<HiOutlineCheck size={18}/>}
              >
                Zapisz
              </Button>
            </Flex>
          </Form>

          <Flex
            w="100%"
            px={3}
            mt={10}
            direction="row"
          >
            <Heading
              size="md"
            >
              Użytkownicy
            </Heading>
          </Flex>

          <Divider/>
        </Flex>
      </Center>
    </AppLayout>
  );
}



export default OrganizationSettings;
