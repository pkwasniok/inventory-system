import { createColumnHelper } from '@tanstack/react-table';
import { Item } from '@prisma/client';



interface InventoryTableProps {

};

const InventoryTable = ({}: InventoryTableProps) => {
  const columnHelper = createColumnHelper<Item>()

  return (
    <table>
      <thead>

      </thead>
      <tbody>

      </tbody>
    </table>
  );
}



export default InventoryTable;
