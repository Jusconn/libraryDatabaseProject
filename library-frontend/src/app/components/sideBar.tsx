import { Drawer, Button } from "@mui/material";
import { useState } from 'react';

interface SideBarProps {
    buttons: string[];
    pages: React.ReactNode[];
}

export default function SideBar({ buttons, pages }: SideBarProps) {
    const [selectedPage, setSelectedPage] = useState<React.ReactNode>(pages[0]);
    const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);

    const handleButtonClick = (index: number) => {
        setSelectedPage(pages[index]);
        setActiveButtonIndex(index);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        height: 750,
                        boxSizing: 'border-box',
                        backgroundColor: 'black',
                        color: 'black',
                        position: 'relative',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                {buttons.map((button, index) => (
                    <Button
                        sx={{
                            height: '50px',
                            backgroundColor: activeButtonIndex === index ? 'navy' : 'inherit',
                        }}
                        key={index}
                        onClick={() => handleButtonClick(index)}
                    >
                        {button}
                    </Button>
                ))}
            </Drawer>
            <div style={{ marginLeft: '0px', color: 'white', flexGrow: 1 }}>
                {selectedPage}
            </div>
        </div>
    );
}