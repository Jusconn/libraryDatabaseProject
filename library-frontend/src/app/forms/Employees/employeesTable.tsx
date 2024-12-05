import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllEmployees } from '../../pages/queryfns';
import { useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

type Employee = {
    emp_id: number;
    Fname: string;
    Lname: string;
    phone: string;
    street: string;
    zip: string;
    salary: number;
};

const EmployeeForm = () => {
  const { data, refetch } = useQuery({
    queryKey: ['getEmployees'],
    queryFn: getAllEmployees,
  });

  const memoizedData = useMemo(() => data, [data]);

  const [tableData, setTableData] = useState<Employee[]>([]);

  useEffect(() => {
    if (memoizedData && Array.isArray(memoizedData)) {
      setTableData(memoizedData);
    }
  }, [memoizedData]);

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      { accessorKey: 'emp_id', header: 'Employee ID', size: 100 },
      { accessorKey: 'Fname', header: 'First Name', size: 150 },
      { accessorKey: 'Lname', header: 'Last Name', size: 150 },
      { accessorKey: 'phone', header: 'Phone', size: 150 },
      { accessorKey: 'street', header: 'Address', size: 150 },
      { accessorKey: 'zip', header: 'Zip', size: 150 },
      { accessorKey: 'salary', header: 'Salary', size: 150 },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
  });

  return <MaterialReactTable table={table} />;
};

export default EmployeeForm;