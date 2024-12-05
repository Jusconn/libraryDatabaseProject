import {Box, Stack, TextField, Typography, Button} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { addBook,addcdvid } from '../../pages/queryfns';
import { useState,useEffect } from 'react';
import SearchButtons from '../../components/searchButtons';

export default function AddItemForm() {
    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [artist, setArtist] = useState('');
    const [runtime, setRuntime] = useState('');
    const [message, setMessage] = useState('');
    const [table, setTable] = useState('Books');
    const buttons = ["Books", "Videos", "CDs"];
    const { data:bookSuccess, refetch:postBook } = useQuery({ 
        queryKey: ['addBook'], 
        queryFn: () => addBook(Number(isbn)), 
        enabled: false 
    });

    const { data:cdvidSuccess, refetch:postCdvid } = useQuery({ 
        queryKey: ['addcdvid'], 
        queryFn: () => addcdvid(title, year, genre, artist, runtime, table),
        enabled: false 
    });

    useEffect(() => {
        if (table === "Books" && bookSuccess !== undefined ) {
            if (bookSuccess === 1) {
                setMessage("Item Added Successfully");
            } else if (bookSuccess === 0) {
                setMessage("Failed to Add Item");
            }

            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);

            return () => clearTimeout(timer);
        }
        else if(table !== "Books" && cdvidSuccess !== undefined) {
            if (cdvidSuccess === 1) {
                setMessage("Item Added Successfully");
            } else if (cdvidSuccess === 0) {
                setMessage("Failed to Add Item");
            }

            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);

            return () => clearTimeout
        }
    }, [bookSuccess,cdvidSuccess]);



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (table === "Books") {
            if (isbn === '') {
                setMessage("Please enter ISBN");
                return;
            }
            postBook();
        } else {
            if (title === '' || year === '' || genre === '' || artist === '' || runtime === '') {
                setMessage("Please fill out all fields");
                return;
            }
            postCdvid();
        }
        
        
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
                        Add Item Form
                    </Typography>
                    <SearchButtons buttons={buttons} setTable={setTable} />
                    {table === "Books" && (
                        <TextField 
                            id="item-id" 
                            label="ISBN" 
                            variant="outlined" 
                            onChange={(e) => setIsbn(e.target.value)}
                            sx={{
                                input: { color: 'white' },
                                label: { color: 'white' },
                                fieldset: { borderColor: "white", '&:hover': { borderColor: "white" } }
                            }} 
                        />
                    )}
                    {table === "Videos" && (<>
                        <TextField 
                            id="title" 
                            label="Title" 
                            variant="outlined" 
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{
                                input: { color: 'white' },
                                label: { color: 'white' },
                                fieldset: { borderColor: "white", '&:hover': { borderColor: "white" } }
                            }} 
                        />
                        <TextField 
                            id="year" 
                            label="Year" 
                            variant="outlined" 
                            onChange={(e) => setYear(e.target.value)}
                            sx={{
                                input: { color: 'white' },
                                label: { color: 'white' },
                                fieldset: { borderColor: "white", '&:hover': { borderColor: "white" } }
                            }} 
                        />
                        <TextField 
                            id="genre" 
                            label="Genre" 
                            variant="outlined" 
                            onChange={(e) => setGenre(e.target.value)}
                            sx={{
                                input: { color: 'white' },
                                label: { color: 'white' },
                                fieldset: { borderColor: "white", '&:hover': { borderColor: "white" } }
                            }} 
                        />
                        <TextField 
                            id="director" 
                            label="Director" 
                            variant="outlined" 
                            onChange={(e) => setArtist(e.target.value)}
                            sx={{
                                input: { color: 'white' },
                                label: { color: 'white' },
                                fieldset: { borderColor: "white", '&:hover': { borderColor: "white" } }
                            }} 
                        />
                        <TextField 
                            id="runtime" 
                            label="Length(minutes)" 
                            variant="outlined" 
                            onChange={(e) => setRuntime(e.target.value)}
                            sx={{
                                input: { color: 'white' },
                                label: { color: 'white' },
                                fieldset: { borderColor: "white", '&:hover': { borderColor: "white" } }
                            }} 
                        />
                    </>)}
                    {table === "CDs" && (<>
                        <TextField 
                            id="title" 
                            label="Title" 
                            variant="outlined" 
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{
                                input: { color: 'white' },
                                label: { color: 'white' },
                                fieldset: { borderColor: "white", '&:hover': { borderColor: "white" } }
                            }} 
                        />
                        <TextField 
                            id="year" 
                            label="Year" 
                            variant="outlined" 
                            onChange={(e) => setYear(e.target.value)}
                            sx={{
                                input: { color: 'white' },
                                label: { color: 'white' },
                                fieldset: { borderColor: "white", '&:hover': { borderColor: "white" } }
                            }} 
                        />
                        <TextField 
                            id="genre" 
                            label="Genre" 
                            variant="outlined" 
                            onChange={(e) => setGenre(e.target.value)}
                            sx={{
                                input: { color: 'white' },
                                label: { color: 'white' },
                                fieldset: { borderColor: "white", '&:hover': { borderColor: "white" } }
                            }} 
                        />
                        <TextField 
                            id="director" 
                            label="Artist" 
                            variant="outlined" 
                            onChange={(e) => setArtist(e.target.value)}
                            sx={{
                                input: { color: 'white' },
                                label: { color: 'white' },
                                fieldset: { borderColor: "white", '&:hover': { borderColor: "white" } }
                            }} 
                        />
                        <TextField 
                            id="runtime" 
                            label="Length(minutes)" 
                            variant="outlined" 
                            onChange={(e) => setRuntime(e.target.value)}
                            sx={{
                                input: { color: 'white' },
                                label: { color: 'white' },
                                fieldset: { borderColor: "white", '&:hover': { borderColor: "white" } }
                            }} 
                        />
                    </>
                    )}
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