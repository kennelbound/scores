import React, {useState} from "react";
import {Container, Image, Nav, Navbar, Spinner} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import {get, OMDBResponse, search} from "./OMDB";
import {ApiKeyForm} from "./ApiKeyForm";

import 'bootstrap/dist/css/bootstrap.min.css';
import {getApiKey} from "./config";

function App() {
    const [titles, setTitles] = useState<OMDBResponse[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (title: string) => {
        if (getApiKey() == null) {
            setError("No OMDB Api Key found, please set it up in Config");
            return;
        }
        setIsSearching(true);
        setError(null);
        const searchItems = await search(title);
        if (!searchItems) {
            setError("No titles found");
            setIsSearching(false);
            return;
        }

        const results = [];
        for (const item of searchItems) {
            const result = await get(item.Title, item.Year);
            if (result) {
                results.push(result);
            }
        }
        setIsSearching(false);
        setTitles(results);
    }

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Navbar bg="light" expand="md">
                <Navbar.Brand style={{paddingLeft: 16}} href="./">
                    <Image src='./64.png' style={{height: 30, paddingRight: 8}} fluid={true}/>
                    Search for Movie Scores</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link href="./">Search</Nav.Link>
                        <Nav.Link href="./config">Config</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Routes>
                <Route path="/config" element={
                    <ApiKeyForm/>
                }/>
                <Route path="/" element={
                    <Container style={{paddingTop: 15}}>
                        <SearchForm onSearch={handleSearch}/>
                        {isSearching ? <Spinner animation="border" size="sm"/> :
                            <SearchResults titles={titles} error={error}/>}
                    </Container>
                }>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
