import {Button, Col, Form, Row} from 'react-bootstrap';
import React, {useState} from 'react';

type SearchFormProps = {
    onSearch: (title: string) => void;
};

const SearchForm = ({onSearch}: SearchFormProps) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(title);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    return (
        <Form onSubmit={handleSubmit} style={{marginBottom: 16}}>
            <Row>
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Enter movie title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </Col>
                <Col>
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};
export default SearchForm;