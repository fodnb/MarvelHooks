import React, { useState } from 'react';

const Search = (props) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChange = (e) => setSearchValue(e.target.value);

    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }

    const resetInputField = () => {
        setSearchValue("");
    }

    return (
        <form>
            <input
                className="heroName"
                type="text"
                name="clientInput"
                value={searchValue}
                onChange={handleSearchInputChange}
                autoComplete="off"
            />

            <input
                onClick={callSearchFunction}
                type="submit"
                value="Search"
            />

        </form>
    )
}

export default Search;