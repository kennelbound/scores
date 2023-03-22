import {Col, Image, Row} from "react-bootstrap";
import {OMDBTitle} from "./OMDB";

function SearchResult({title}: { title: OMDBTitle }) {
    const {Title, Year, Director, Actors, Poster, Awards, Ratings} = title;
    return (
        <>
            <Row>
                <Col xs={12} sm={4} md={3} lg={2}>
                    <Image src={Poster} fluid/>
                </Col>
                <Col>
                    <h2>{Title} ({Year})</h2>
                    <p>Director: {Director}</p>
                    <p>Primary Cast: {Actors}</p>
                    <p>Awards: {Awards}</p>
                    <h4>Ratings:</h4>
                    <ul>
                        {Ratings.map((rating) => (
                            <li key={rating.Source}>
                                {rating.Source}: {rating.Value}
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
            <hr/>
        </>
    );
}

export default SearchResult;