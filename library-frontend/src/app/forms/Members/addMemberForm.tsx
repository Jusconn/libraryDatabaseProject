import {Box, Stack, TextField, Typography, Button} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { addMember } from '../../pages/queryfns';
import { useState,useEffect } from 'react';

export default function AddMemberForm() {
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [mi, setMi] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street,setStreet] = useState('');
    const [town, setTown] = useState('');
    const [zip, setZip] = useState('');


    const [message, setMessage] = useState('');
    const { data, refetch } = useQuery({ 
        queryKey: ['addMember'], 
        queryFn: () => addMember(Fname, Lname, mi, email, phone, street, town, zip), 
        enabled: false 
    });

    useEffect(() => {
        if (data !== undefined) {
            if (data === 1) {
                setMessage("Add Member Successful");
            } else if (data === 0) {
                setMessage("Add Member Failed");
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
                        Add Member Form
                    </Typography>
                    <Stack direction="row">
                        <TextField 
                        id="member-id" 
                        label="First Name" 
                        variant="outlined" 
                        onChange={(e) => setFname(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white" }
                        }} 
                    />
                     <TextField 
                        id="member-id" 
                        label="Last Name" 
                        variant="outlined" 
                        onChange={(e) => setLname(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white" }
                        }} 
                    />
                        </Stack>
                        <Stack direction="row">
                        <TextField 
                        id="member-id" 
                        label=" Middle Initial" 
                        variant="outlined" 
                        onChange={(e) => setMi(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white" }
                        }} 
                    />
                     <TextField 
                        id="member-id" 
                        label="Email" 
                        variant="outlined" 
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white" }
                        }} 
                    />
                        </Stack>
                        <Stack direction="row">
                        <TextField 
                        id="member-id" 
                        label="Phone" 
                        variant="outlined" 
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white" }
                        }} 
                    />
                     <TextField 
                        id="member-id" 
                        label="street" 
                        variant="outlined" 
                        onChange={(e) => setStreet(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white" }
                        }} 
                    />
                        </Stack>
                        <Stack direction="row">
                        <TextField 
                        id="member-id" 
                        label="Town" 
                        variant="outlined" 
                        onChange={(e) => setTown(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white" }
                        }} 
                    />
                     <TextField 
                        id="member-id" 
                        label="Zip" 
                        variant="outlined" 
                        onChange={(e) => setZip(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            fieldset: { borderColor: "white" }
                        }} 
                    />
                        </Stack>
                        

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