import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    placeholder?: string;
    value: string;
    setQuery?: React.Dispatch<React.SetStateAction<string>>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ placeholder = "Search...", value, onChange,onKeyDown }: SearchBarProps) {
    return (
        <TextField
            sx={{ 
                margin: '20px',
                width: '80%', 
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'white',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white',
                    },
                    '& input': {
                        color: 'white',
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'white',
                    },
                },
            }}
            variant="outlined"
            placeholder={placeholder}
            value={value}
            onKeyDown={onKeyDown}
            onChange={onChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            fullWidth
        />
    );
}
