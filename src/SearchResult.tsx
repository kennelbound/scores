import {Badge, Col, Image, Row} from "react-bootstrap";
import {OMDBTitle} from "./OMDB";

const relabel = (s: string): string => {
    switch (s) {
        case "Internet Movie Database":
            return 'IMDB'
        default:
            return s;
    }
}

const logo = (s: string): string => {
    switch (s) {
        case "Internet Movie Database":
            return './imdb.png';
        case 'Rotten Tomatoes':
            return './rottentomatoes.png';
        case 'Metacritic':
            return './metacritic.png';
        default:
            return './logo192.png';
    }
}

function SearchResult({title}: { title: OMDBTitle }) {
    const {Title, Year, Director, Actors, Poster, Awards, Ratings} = title;
    return (
        <>
            <Row>
                <Col xs={12} sm={4} md={3} lg={2}>
                    <Image src={Poster} fluid/>
                </Col>
                <Col>
                    <Row>
                        <h3>{Title} ({Year})</h3>
                    </Row>
                    <Row>
                        <Col>
                            Director: <Badge bg="primary">{Director}</Badge>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Primary Cast: {Actors.split(',').map(it => <Badge bg="secondary">{it}</Badge>)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Awards: <Badge bg="info">Awards{Awards}</Badge>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Ratings</b>
                        </Col>
                    </Row>
                    {Ratings.map(({Source, Value}) => <Row>
                        <Col>
                            <Image src={logo(Source)} style={{width: 45, paddingRight: 12}} title={relabel(Source)}/>
                            <Badge style={{width: 70}}
                                   bg='warning'>{Value}</Badge>
                        </Col>
                    </Row>)}
                </Col>
            </Row>
            <hr/>
        </>
    );
}

export default SearchResult;