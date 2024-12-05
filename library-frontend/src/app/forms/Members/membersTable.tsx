import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllMembers } from '../../pages/queryfns';
import { useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

type Member = {
    lib_ID: number;
    Fname: string;
    Lname: string;
    email: string;
    Phone: string;
    street: string;
    zip: string;
};

const MemberForm = () => {
  const { data, refetch } = useQuery({
    queryKey: ['getMembers'],
    queryFn: getAllMembers,
  });

  const memoizedData = useMemo(() => data, [data]);

  const [tableData, setTableData] = useState<Member[]>([]);

  useEffect(() => {
    if (memoizedData && Array.isArray(memoizedData)) {
      setTableData(memoizedData);
    }
  }, [memoizedData]);

  const columns = useMemo<MRT_ColumnDef<Member>[]>(
    () => [
      { accessorKey: 'lib_ID', header: 'Member ID', size: 100 },
      { accessorKey: 'Fname', header: 'First Name', size: 150 },
      { accessorKey: 'Lname', header: 'Last Name', size: 150 },
      { accessorKey: 'email', header: 'Email', size: 150 },
      { accessorKey: 'Phone', header: 'Phone', size: 150 },
      { accessorKey: 'street', header: 'Address', size: 150 },
      { accessorKey: 'zip', header: 'Zip', size: 150 },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
  });

  return <MaterialReactTable table={table} />;
};

export default MemberForm;