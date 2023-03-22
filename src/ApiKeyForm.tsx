import {Alert, Button, Container, Form, Spinner} from 'react-bootstrap';
import React, {useState} from 'react';
import {getApiKey, setApiKey} from "./config";
import {search} from "./OMDB";

export const ApiKeyForm = () => {
    const [apiKeyInput, setApiKeyInput] = useState(getApiKey());
    const [isLoading, setIsLoading] = useState(false);
    const [isValidApiKey, setIsValidApiKey] = useState<boolean | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        search('The+Godfather', apiKeyInput).then(items => {
            console.log("Test", items);
            if (items !== null && items.length > 0) {
                setIsValidApiKey(true);
                setApiKey(apiKeyInput!);
                setIsLoading(false);
            }
        }).catch(err => {
            console.log("Error testing key", {err, apiKeyInput});
            setIsValidApiKey(false);
            setIsLoading(false);
        })
    };

    return (
        <Container>
            <h1>Config</h1>
            {isValidApiKey !== true &&
                <>
                    To get an API key, simply go to <a href="https://omdbapi.com/apikey.aspx">OMDB's API Key Page</a>
                </>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>OMDb API Key</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your OMDb API key"
                        value={apiKeyInput}
                        onChange={evt => setApiKeyInput(evt.target.value)}
                        isInvalid={isValidApiKey === false}
                    />
                    {isValidApiKey === false && <Alert variant="danger">Invalid API key</Alert>}
                    {isValidApiKey === true && <Alert variant="success">Valid Key...Saved!</Alert>}
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isLoading && (apiKeyInput?.length ?? 0) > 0}>
                    {isLoading ? <Spinner animation="border" size="sm"/> : 'Test API Key'}
                </Button>
            </Form>
        </Container>
    );
};