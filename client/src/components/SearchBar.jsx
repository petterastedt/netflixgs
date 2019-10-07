import React, { useState } from 'react';

export default function SearchBar(props) {
	const [searchInput, setSearchInput] = useState(null);

  const handleSubmit = (e) => {
		e.preventDefault()
		props.getResults(searchInput)
  }

  return (
  <div className="searchbar centerContainer">
		<form
		className="searchbar-form"
		onSubmit={(e) => handleSubmit(e)}
		>
      <div className="searchbar-iconWrapper">
        <img src={require(`../assets/icons/search.svg`)}
        className="searchbar-icon"
        alt="search icon"
        onClick={(e) => handleSubmit(e)}
        />
      </div>  
      <input
				className="searchbar-field"
        placeholder="Search for..."
				onChange={(e) => setSearchInput(e.target.value)}
				autoComplete="off"
      />
    </form>
  </div>
  )
}
