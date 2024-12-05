import {Box, Stack, TextField, Typography, Button} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { deleteDevice } from '../../pages/queryfns';
import { useState,useEffect } from 'react';

export default function DeleteDeviceForm() {
    const [itemId, setItemId] = useState('');
    const [message, setMessage] = useState('');
    const { data, refetch } = useQuery({ 
        queryKey: ['deleteItem'], 
        queryFn: () => deleteDevice(Number(itemId)), 
        enabled: false 
    });

    useEffect(() => {
        if (data !== undefined) {
            if (data === 1) {
                setMessage("Delete Successful");
            } else if (data === 0) {
                setMessage("Delete Failed");
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
                        Remove Item Form
                    </Typography>
                    <TextField 
                        id="item-id" 
                        label="Device ID" 
                        variant="outlined" 
                        onChange={(e) => setItemId(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white", '&:hover': { borderColor: "white" } }
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