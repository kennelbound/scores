import {Alert, Container} from "react-bootstrap";
import SearchResult from "./SearchResult";
import {OMDBTitle} from "./OMDB";


function SearchResults({titles, error}: { titles: OMDBTitle[] | null, error: string | null }) {
    if (!titles || titles.length === 0) {
        return <p>No results found</p>;
    }

    return (
        <Container>
            {error && <Alert variant="danger">{error}</Alert>}
            {titles.map((title) => (
                <SearchResult key={`${title.Title}${title.Year}`} title={title}/>
            ))}
        </Container>
    );
}

export default SearchResults;