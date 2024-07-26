import { useState } from "react";
import { SearchIcon, XCircleIcon } from "@primer/octicons-react"; // Import XCircleIcon for error sign
import isEmptyObj from "../helpers/emptyObj";

const SearchBar = (props) => {
    const [error, setError] = useState(false); // State to manage error visibility

    const handleSearch = () => {
        if (!props.searchQuery.trim()) {
            setError(true); // Show error if input is blank
            setTimeout(() => setError(false), 3000); // Hide error after 3 seconds
            return;
        }

        setError(false); // Hide error if input is not blank
        if (props.searchQuery.length && (isEmptyObj(props.data) || props.searchQuery.toLowerCase() !== props.data.login.toLowerCase())) {
            props.setMakeSearch(true);
        }
    };

    return (
        <div className="search-bar">
            <SearchIcon size={32} />
            <input
                type="search"
                placeholder="Search Github username..."
                spellCheck="false"
                onChange={(event) => { 
                    props.setSearchQuery(event.target.value.trim());
                    setError(false); // Hide error when user types
                }}
                value={props.searchQuery}
            />
            <button
                type="button"
                onClick={handleSearch}
            >
                Search
            </button>
            {error && (
                <div className="error-message">
                    <XCircleIcon size={48} />
                    <span>Please enter a username</span>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
