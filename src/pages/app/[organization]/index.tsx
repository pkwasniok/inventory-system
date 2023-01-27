import { AppLayout } from '../../../components';
import { Flex, Card, Table, Thead, TBody, Tr, Td, Th } from '@chakra-ui/react';
import { api } from '../../../utils/api';
import { useRouter } from 'next/router';
import { useTable } from 'react-table';
import { useMemo } from 'react';



const Organization = () => {
  const router = useRouter();
  const query = router.query as { organization: string };

  const organization = api.organization.getById.useQuery(query.organization);

  return (
    <AppLayout
      organization={organization.data ?? undefined}
      loading={organization.status == 'loading'}
    >
      <Flex
        w="100%"
        h="100%"
        direction="row"
        p={3}
        gap={3}
      >
        <Flex
          maxW="350px"
          w="100%"
          direction="column"
        >
          <Sidebar />
        </Flex>

        <Flex
          flex={1}
          direction="column"
          gap={3}
        >
          <ItemsTable/>
        </Flex>
      </Flex>
    </AppLayout>
  );
}



const Sidebar = () => {
  return (
    <Card
      w="100%"
      h="100%"
      variant="outline"
    >

    </Card>
  );
}



const ItemsTable = () => {
  const data = [
    {
      number: 'MSP/000/000/001',
      name: 'Komputer stacjonary HP ProElite 3900',
    },
    {
      number: 'MSP/000/000/002',
      name: 'Komputer stacjonary HP ProElite 3900',
    },
    {
      number: 'MSP/000/000/003',
      name: 'Komputer stacjonary HP ProElite 3900',
    },
    {
      number: 'MSP/000/000/004',
      name: 'Komputer stacjonary HP ProElite 3900',
    },
    {
      number: 'MSP/000/000/005',
      name: 'Komputer stacjonary HP ProElite 3900',
    },
    {
      number: 'MSP/000/001/001',
      name: 'Krzesło drewniane szkolne masnyChair 800',
    },
    {
      number: 'MSP/000/001/002',
      name: 'Krzesło drewniane szkolne masnyChair 800',
    },
    {
      number: 'MSP/000/001/003',
      name: 'Krzesło drewniane szkolne masnyChair 800',
    },
    {
      number: 'MSP/000/001/004',
      name: 'Krzesło drewniane szkolne masnyChair 800',
    },
    {
      number: 'MSP/000/001/005',
      name: 'Krzesło drewniane szkolne masnyChair 800',
    },
  ];

  const columns = useMemo(() => [
    {
      Header: 'Numer inwentarzowy',
      accessor: 'number',
    },
    {
      Header: 'Nazwa',
      accessor: 'name'
    }
  ],
  []);

  const table = useTable({ columns, data });

  return (
    <Card
      w="100%"
      h="100%"
      variant="outline"
      p={3}
    >
      <table {...table.getTableProps()}>
        <thead>
          {table.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{ textAlign: 'left' }}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...table.getTableBodyProps()}>
          {table.rows.map((row) => {
            table.prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  )
}



export default Organization;
