import { Button, Stack } from "@mui/material";
import React, { useState } from "react";

export interface SearchButtonsProps {
    buttons: string[];
    setTable: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchButtons({ buttons,setTable }: SearchButtonsProps) {
    const [selectedButton, setSelectedButton] = useState<number>(0);

    const handleClick = (index: number) => {
        setSelectedButton(index);
        setTable(buttons[index]);
    };

    return (
        <Stack spacing={2} direction="row">
            {buttons.map((button, index) => (
                <Button
                    key={index}
                    variant="contained"
                    color={selectedButton === index ? "primary" : "inherit"}
                    onClick={() => handleClick(index)}
                >
                    {button}
                </Button>
            ))}
        </Stack>
    );
}
