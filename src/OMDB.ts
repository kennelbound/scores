import axios from "axios";
import {getApiKey} from "./config";

export type OMDBSearchResult = {
    Search: Array<OMDBSearch>
    Response: "True"
}

export type OMDBSearch = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: "movie" | "series" | "episode",
    Poster: string,
}

export type OMDBTitle = OMDBSearch & {
    "Director"?: string,
    "Actors": string, //"Cary Elwes, Mandy Patinkin, Robin Wright" comma separated
    "Awards": string,
    "Rated"?: string,
    "Ratings": Array<{ Source: string, Value: string }>,
}

export type OMDBResponse = OMDBTitle &
    {
        "Released"?: string,
        "Runtime"?: string,
        "Genre"?: string, //"Adventure, Family, Fantasy" comma separated
        "Writer"?: string,
        "Plot": string,
        "Language": string,
        "Country": string,
        "Metascore": string,
        "imdbRating": string,
        "imdbVotes": string,
        "Type": string, // Movie
        "DVD": string, //"18 Jul 2000"
        "BoxOffice": string,
        "Production": string,
        "Website": string,
        "Response": "True",
    };

type OMDBError = {
    Response: "False",
    Error: string,
}

export const search = async (title: string, apiKey: string | undefined | null = getApiKey(),): Promise<OMDBSearch[] | null> => {
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apiKey=${apiKey ?? getApiKey()}`;
    const {data} = await axios.get<OMDBSearchResult>(url);
    return data.Response === "True" ? data.Search : null;
}

export const get = async (title: string, year: string, apiKey: string | undefined | null = getApiKey(),): Promise<OMDBResponse | null> => {
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apiKey=${apiKey ?? getApiKey()}`;
    const {data} = await axios.get<OMDBResponse | OMDBError>(url);
    return data.Response === "True" ? data : null;
}