const apiKeyCookieName = "OMDB_API_KEY";

export function setApiKey(apiKey: string) {
    document.cookie = `${apiKeyCookieName}=${apiKey}`;
}

export function getApiKey(): string | undefined {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === apiKeyCookieName) {
            return value;
        }
    }
    return "9751dfc7";
}