import React from 'react';

const Search = (props) => {
    
    return (  
        <div className="ui category search">
            <input className="prompt search-users" type="search" onChange={props.handleChange} value={props.inputValue} placeholder="Search..." />
        </div>
    )
}

export default Search;