import {Box, Stack, TextField, Typography, Button} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { addDevice } from '../../pages/queryfns';
import { useState,useEffect } from 'react';

export default function AddDeviceForm() {
    const [deviceName, setDeviceName] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [lastServiceDate, setLastServiceDate] = useState('');
    const [location, setLocation] = useState('');

    const [message, setMessage] = useState('');
    const { data, refetch } = useQuery({ 
        queryKey: ['addDevice'], 
        queryFn: () => addDevice(deviceName, deviceType, location, purchaseDate, lastServiceDate), 
        enabled: false 
    });

    useEffect(() => {
        if (data !== undefined) {
            if (data === 1) {
                setMessage("Add Device Successful");
            } else if (data === 0) {
                setMessage("Add Device Failed");
            }

            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [data]);



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        refetch();
        
        
    };

    return (
        <Box sx={{ border: '1px solid white', margin: '20px', height:'700px' }}>
            <form onSubmit={handleSubmit}>
                <Stack
                    marginTop={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={5}
                >   
                    <Typography variant="h4" component="div">
                        Add Device Form
                    </Typography>
                    <TextField 
                        id="member-id" 
                        label="Device Name" 
                        variant="outlined" 
                        onChange={(e) => setDeviceName(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white" }
                        }} 
                    />
                    <TextField 
                        id="employee-id" 
                        label="Device Type" 
                        variant="outlined" 
                        onChange={(e) => setDeviceType(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white" }
                        }} 
                    />
                    <TextField 
                        id="employee-id" 
                        label="Location" 
                        variant="outlined" 
                        onChange={(e) => setLocation(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white" }
                        }} 
                    />
                    <TextField 
                        id="employee-id" 
                        label="Purchase Date" 
                        variant="outlined" 
                        onChange={(e) => setPurchaseDate(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white" }
                        }} 
                    />
                    <TextField 
                        id="employee-id" 
                        label="Last service date" 
                        variant="outlined" 
                        onChange={(e) => setLastServiceDate(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white" }
                        }} 
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Stack>
            </form>
            <Typography variant="h6" component="div" align="center">
                {message}
            </Typography>
        </Box>
    );
}