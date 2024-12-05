import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import ManageEmpsScreen from '../pages/manageEmps';
import ManageDevsScreen from '../pages/manageDevs';
import ManageMembersScreen from '../pages/manageMems';
import ManageInvScreen from '../pages/manageInv';

function TabPanel({ children, value, index }: { children: React.ReactNode, value: number, index: number }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

interface TabPanelProps {
    children: React.ReactNode;
    value: number;
    index: number;
}

interface HandleChangeEvent {
    target: EventTarget;
}

const handleChange = (event: HandleChangeEvent, newValue: number): void => {
    setValue(newValue);
};

  return (
    <Box sx={{ width: '100%', color: 'white' }}>
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      <Tab label="Manage Inventory" sx={{ color: 'white' }} />
      <Tab label="Manage Devices" sx={{ color: 'white' }} />
      <Tab label="Manage Members" sx={{ color: 'white' }} />
      <Tab label="Manage Employees" sx={{ color: 'white' }} />
    </Tabs>
      <TabPanel value={value} index={0}>
        <ManageInvScreen />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ManageDevsScreen />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ManageMembersScreen />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ManageEmpsScreen />
      </TabPanel>
    </Box>
  );
}
