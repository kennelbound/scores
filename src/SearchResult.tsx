import {Badge, Col, Image, Row} from "react-bootstrap";
import {OMDBResponse} from "./OMDB";

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
            return './64.png';
    }
}

const imdbLink = (imdbId: string) => `https://www.imdb.com/title/${encodeURIComponent(imdbId)}/?ref_=fn_al_tt_1`;
const rtlink = (title: string) => `https://www.rottentomatoes.com/search?search=${encodeURIComponent(title)}`;
const mclink = (title: string) => `https://www.metacritic.com/search/all/${encodeURIComponent(title)}/results`;
const personlink = (name: string) => `https://www.imdb.com/search/name/?name=${encodeURIComponent(name)}`;

const link = (imdbID: string, title: string, source: string) => {
    switch (source) {
        case "Internet Movie Database":
            return imdbLink(imdbID);
        case 'Rotten Tomatoes':
            return rtlink(title);
        case 'Metacritic':
            return mclink(title);
        default:
            return '#';
    }
}

function SearchResult({title}: { title: OMDBResponse }) {
    const {Title, Year, Director, Actors, Poster, Awards, Ratings, imdbID} = title;
    return (
        <>
            <Row>
                <Col xs={12} sm={4} md={3} lg={2}>
                    <a href={imdbLink(imdbID)} target='_blank' rel='noreferrer'>
                        <Image src={Poster} fluid={true}/>
                    </a>
                </Col>
                <Col>
                    <Row>
                        <h3>{Title} ({Year})</h3>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    Ratings
                                </Col>
                            </Row>
                            {Ratings.map(({Source, Value}) => <Row>
                                <Col>
                                    <a href={link(imdbID, Title, Source)} target='_blank' rel='noreferrer'>
                                        <Image src={logo(Source)} style={{width: 45, paddingRight: 12}}
                                               title={relabel(Source)}/>
                                        <Badge style={{width: 70}}
                                               bg='warning'>{Value}</Badge>
                                    </a>
                                </Col>
                            </Row>)}
                            <Row>
                                <Col>
                                    Awards:
                                </Col>
                            </Row>
                            {Awards.split("&").map(award =>
                                <Row>
                                    <Col>
                                        <Badge bg="info">{award}</Badge>
                                    </Col>
                                </Row>
                            )}

                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    Director:
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <a href={personlink(Director ?? '')} target='_blank' rel='noreferrer'>
                                        <Badge bg="primary">{Director}</Badge>
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Primary Cast:
                                </Col>
                            </Row>
                            {Actors.split(',').map(it => <Row>
                                    <Col>
                                        <a href={personlink(it)} target='_blank' rel='noreferrer'>
                                            <Badge bg="secondary">{it}</Badge>
                                        </a>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <hr/>
        </>
    );
}

export default SearchResult;