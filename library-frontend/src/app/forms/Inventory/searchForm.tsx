import SearchBar from "../../components/searchBar";
import SearchButtons from "../../components/searchButtons";
import MediaCard from "../../components/infoCards";
import { Box,Stack,Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, use } from "react";
import { searchInventory } from "../../pages/queryfns";

async function googleBooksInfo(isbn: any[]) {
    console.log(isbn);
    const links: any[] = [];
    if (isbn.length > 0) {
        const promises = isbn.map(async (isbnItem) => {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?key=AIzaSyAf4ulvHfdlToZZg3_NFwrAuYb9qBlbqIE&q=isbn:${isbnItem.isbn}`);
            let result = await response.json();
            result = result?.items[0]?.volumeInfo ? result.items[0].volumeInfo : null;
            result.is_available = isbnItem.is_available;
            result.id = isbnItem.id;
            return result;
        });
        const results = await Promise.all(promises);
        links.push(...results);
    }
    return links;
}

export default function SearchForm() {
    const [query, setQuery] = useState("")
    const [table, setTable] = useState("Books")
    const [mediaCards, setMediaCards] = useState<React.ReactNode>([])
    const searchbuttons = ["Books", "Videos", "CDs"]
    const {data, refetch} = useQuery({queryKey: ['searchInventory'], queryFn: () => searchInventory(query, table), enabled: false});
    useEffect(() => {
        if (data && table === "Books") {
            const isbns = data.map((item: any) => ({ isbn: item.isbn, is_available: item.is_available, id: item.item_id }));
            const fetchBooks = async () => {
                const books = await googleBooksInfo(isbns);
                const mediaCards = books.map((item: any, index: number) => (
                    <MediaCard key={index} id={item.id} title={item.title} content={`${item.authors[0]}, ${item.is_available ? 'In Stock' : 'Checked Out'}`} image={item.imageLinks.smallThumbnail} />
                ));
                setMediaCards(mediaCards);
            };
            fetchBooks();
        }
        else if (data && table === "CDs") {
            const mediaCards = data.map((item: any, index: number) => (
                <MediaCard key={index} title={item.title} id={item.item_id} content={`${item.artist}, ${item.is_available ? 'In Stock' : 'Checked Out'}`} image={"/disc.svg"} />
            ));
            setMediaCards(mediaCards);
        }
        else if (data && table === "Videos") {
            const mediaCards = data.map((item: any, index: number) => (
                <MediaCard  id={item.item_id} key={index} title={item.title} content={`${item.director}, ${item.is_available ? 'In Stock' : 'Checked Out'}`} image={"/movie.svg"} />
            ));
            setMediaCards(mediaCards);
        }
    }, [data]);

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            refetch();
        }
    };

    return (
        <Box sx={{ border: '1px solid white', margin: '20px', height:'700px' }}>
            <Stack margin={2}spacing={2} direction="row">
            <SearchBar
                placeholder="Search By Title or Genre" 
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
            />
            <SearchButtons buttons={searchbuttons} setTable={setTable} />
            </Stack>
            <Stack margin={2} spacing={2} direction="row">
                {mediaCards}
            </Stack>

        </Box>
    );
}