import React, { useReducer } from 'react';
import keys from "./private/keys";
import md5 from 'js-md5';
import fetch from 'isomorphic-unfetch';
import CharacterPage from './CharacterPage';
import Search from './Search';
import Footer from './Footer';
let timestamp = Date.now();
const { privatekey, publickey } = keys;

//run hash function for marvel api
md5(timestamp + privatekey + publickey);
var hash = md5.create();
hash.update(timestamp + privatekey + publickey);
hash.hex();


const initialState = {
    hero: {},
    errorMessage: null
};


const reducer = (state, action) => {
    switch (action.type) {
        case "HERO_SEARCH_REQUEST":
            return {
                ...state,
                errorMessage: null
            }
        case "HERO_SEARCH_SUCCESS":
            return {
                ...state,
                hero: action.payload
            }
        case "HERO_SEARCH_CLEAR":
            return {
                ...state,
                hero: action.payload
            }
        case "HERO_SEARCH_FAILURE":
            return {
                ...state,
                errorMessage: action.error
            }
        default:
            return state;
    }
}


function Character() {

    const [state, dispatch] = useReducer(reducer, initialState);

    const search = searchValue => {
        dispatch({ type: "HERO_SEARCH_REQUEST" });
        searchValue = searchValue.replace(/ /g, "+");
        let url = "https://gateway.marvel.com/v1/public/characters?ts=" + timestamp + "&apikey=" + publickey + "&hash=" + hash + "&limit=" + 1 + "&nameStartsWith=" + searchValue;
        console.log(searchValue);
        fetch(url)
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                if (jsonResponse.status === "Ok" && jsonResponse.data.total > 0) {
                    dispatch({
                        type: 'HERO_SEARCH_SUCCESS',
                        payload: {
                            img: `${jsonResponse.data.results[0].thumbnail.path}.${jsonResponse.data.results[0].thumbnail.extension}`,
                            name: jsonResponse.data.results[0].name,
                            description: jsonResponse.data.results[0].description
                        }
                    })
                } else {
                    console.log('fail');
                    console.log(jsonResponse.Error);
                    dispatch({
                        type: "HERO_SEARCH_FAILURE",
                        error: "No results found for your query please try again"
                    })
                }
            })
    } // end search

    const clear = () => {
        dispatch({
            type: "HERO_SEARCH_CLEAR",
            payload: {}
        })
    } // end clear

    const { hero, errorMessage } = state;

    return (
        <div>
            <h1>Marvel Search</h1>
            {!hero.name ? (<Search search={search} />) : (<CharacterPage hero={hero} clear={clear} />)}
            {errorMessage ? <p className="error">{errorMessage}</p> : <p></p>}
            <Footer />
        </div>
    );
};

export default Character;
