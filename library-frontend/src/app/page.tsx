'use client';

import { Box } from '@mui/system';
import BasicTabs from './components/basicTabs';

export default function Home() {
  return (
  <>
  <h1 style={{textAlign: 'center', fontSize: '3rem', fontFamily: 'YourFontName'}}>Library Management System</h1>
    <Box sx={{border: '1px solid white', color: 'white', borderRadius: '1px', margin: '20px', height: '800px' }}>
      <BasicTabs />
    </Box>
  </>
  );
}
