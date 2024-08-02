import { useState } from "react";
import { SearchIcon, XCircleIcon } from "@primer/octicons-react";
import toast from 'react-hot-toast';
import isEmptyObj from "../helpers/emptyObj";

const SearchBar = (props) => {
    const [error, setError] = useState(false);

    const handleSearch = () => {
        if (!props.isAuthenticated) {
            toast.error("Please sign in to continue.");
            return;
        }

        if (!props.searchQuery.trim()) {
            setError(true);
            setTimeout(() => setError(false), 3000);
            return;
        }

        setError(false);
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
                    setError(false);
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
