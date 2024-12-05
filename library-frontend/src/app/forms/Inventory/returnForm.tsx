import {Box, Stack, TextField, Typography, Button} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { returnItem } from '../../pages/queryfns';
import { useState,useEffect } from 'react';

export default function ReturnForm() {
    const [itemId, setItemId] = useState('');
    const [message, setMessage] = useState('');
    const { data, refetch } = useQuery({ 
        queryKey: ['ReturnItem'], 
        queryFn: () => returnItem(Number(itemId)), 
        enabled: false 
    });

    useEffect(() => {
        if (data !== undefined) {
            if (data === 1) {
                setMessage("Return Successful");
            } else if (data === 0) {
                setMessage("Return Failed");
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
                        Return Form
                    </Typography>
                    <TextField 
                        id="item-id" 
                        label="Item ID" 
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