import {Button, Form} from 'react-bootstrap';
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
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Movie Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter movie title"
                    value={title}
                    onChange={handleTitleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Search
            </Button>
        </Form>
    );
};
export default SearchForm;