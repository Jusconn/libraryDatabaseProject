import {Box, Stack, TextField, Typography, Button} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { addEmployee } from '../../pages/queryfns';
import { useState,useEffect } from 'react';

export default function AddEmployeeForm() {
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [Phone, setPhone] = useState('');
    const [street,setStreet] = useState('');
    const [town, setTown] = useState('');
    const [zip, setZip] = useState('');
    const [salary, setSalary] = useState('');

    const [message, setMessage] = useState('');
    const { data, refetch } = useQuery({ 
        queryKey: ['addEmployee'], 
        queryFn: () => addEmployee(Fname, Lname, Phone, street, town, zip, Number(salary)),
        enabled: false 
    });

    useEffect(() => {
        if (data !== undefined) {
            if (data === 1) {
                setMessage("Add Employee Successful");
            } else if (data === 0) {
                setMessage("Add Employee Failed");
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
                        Add Employee Form
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
                        <TextField 
                        id="member-id" 
                        label="Salary" 
                        variant="outlined" 
                        onChange={(e) => setSalary(e.target.value)}
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