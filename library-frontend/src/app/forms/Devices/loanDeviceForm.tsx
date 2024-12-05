import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllDevices, updateDeviceStatus } from '@/app/pages/queryfns';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

type Device = {
  device_id: number;
  device_name: string;
  device_type: string;
  status: string;
  location: string;
  purchase_date: string;
  last_service_date: string;
};

const LoanDeviceForm = () => {
  const [deviceID, setDeviceID] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const { data: statusUpdate, refetch: statusUpdateFetch } = useQuery({
    queryKey: ['statusUpdate'],
    queryFn: async () => {
      const result = await updateDeviceStatus(deviceID, status);
      refetch();
      return result;
    },
    enabled: false,
  });

  const { data, refetch } = useQuery({
    queryKey: ['getDevices'],
    queryFn: getAllDevices,
  });

  const memoizedData = useMemo(() => data, [data]);

  const [tableData, setTableData] = useState<Device[]>([]);

  useEffect(() => {
    if (memoizedData) {
      setTableData(memoizedData);
    }
  }, [memoizedData]);

  const columns = useMemo<MRT_ColumnDef<Device>[]>(
    () => [
      { accessorKey: 'device_id', header: 'Device ID', size: 100 },
      { accessorKey: 'device_name', header: 'Device Name', size: 150 },
      { accessorKey: 'device_type', header: 'Device Type', size: 150 },
      { accessorKey: 'status', header: 'Status', size: 150 },
      { accessorKey: 'location', header: 'Location', size: 150 },
      { accessorKey: 'purchase_date', header: 'Purchase Date', size: 150 },
      { accessorKey: 'last_service_date', header: 'Last Service Date', size: 150 },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem
        key="loan"
        onClick={async () => {
          setDeviceID(row.original.device_id);
          setStatus('in use');
          await statusUpdateFetch();
        }}
      >
        Loan Device
      </MenuItem>,
      <MenuItem
        key="return"
        onClick={async () => {
          setDeviceID(row.original.device_id);
          setStatus('available');
          await statusUpdateFetch();
        }}
      >
        Mark as Returned
      </MenuItem>,
      <MenuItem
        key="maintenance"
        onClick={async () => {
          setDeviceID(row.original.device_id);
          setStatus('maintenance');
          await statusUpdateFetch();
        }}
      >
        Under Maintenance
      </MenuItem>,
    ],
  });

  return <MaterialReactTable table={table} />;
};

export default LoanDeviceForm;