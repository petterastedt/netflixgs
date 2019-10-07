import React, { useState, useEffect } from 'react';
import './main.css';
import CardItem from './components/CardItem'
import Header from './components/Header'
import Modal from './components/Modal'
import SearchBar from './components/SearchBar'
import Loading from './components/Loading'

const App = () => {

const [searchResults, setSearchResults] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [noResults, setNoResults] = useState(false);
const [modalIsVisible, setModalIsVisible] = useState(false);
const [isClickedItem, setIsClickedItem] = useState({});
const [animateHeader, setAnimateHeader] = useState(false);
const [dbCountry, setDbCountry] = useState({});

useEffect(() => {
    setDbCountry({ country: "Global", code: ""})
    setNoResults(false)
  }, [])

const setClickedItem = (clickedItem) => {
  setIsClickedItem(clickedItem)
  setModalIsVisible(!modalIsVisible)
}

const setSelectedCountry = (selectedCountry) => {
  setDbCountry(selectedCountry)
}

const getResults = async (query) => { // call function with query
  setNoResults(false)
  setIsLoading(true)
  const results = await fetch('http://localhost:5000/search', { // get results from local database
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      searchString: query,
      country: dbCountry.code
    })
    })
    .then(response => response.json())
    .catch(err => console.log("Error: ", err))

  const metaCheck = results.map(async res => { // map through results
    if (res.imdbId || res.imdbId === null) { // if result has metadata (ex. rating)
      console.log('Item up to date!')
      return res
    } else {
      console.log('Update db item')
      const updatedItem = await updateItem(res) // call updateItem
      return updatedItem
    }
  })
  const output = await Promise.all(metaCheck)
  console.log("resultat :", output)

  if (output.length === 0) {
    setNoResults(true)
    setSearchResults([])
  } else {
    setAnimateHeader(true)
    setSearchResults(output)
  }

  setIsLoading(false)
}

const updateItem = async (query) => {
  let formatedQuery
  if (query.title.endsWith("A")) {
      formatedQuery = query.title.substring(0, query.title.length - 3).split(' ').join('+')
  } else if (query.title.endsWith("The")) {
      formatedQuery = query.title.substring(0, query.title.length - 5).split(' ').join('+')
  } else {
      formatedQuery = query.title.split(' ').join('+')
  }
 
  const updateItemDb = await fetch(`http://localhost:5000/items/${query._id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          query: query,
          formatedQuery: formatedQuery
      })
  })
  .then(response => response.json()) 
  .then(data => { return data })
  .catch(err => console.log("Error: ", err))

  return updateItemDb
}

  return (
    <div className="App">
      <div className={`App-wrapper ${modalIsVisible && "App-wrapper--isBlurred"} ${animateHeader && "App-wrapper--isAnimated"}`}>
        <Header
        selectCountry={setSelectedCountry}
        dbCountry={dbCountry}
        />
        <SearchBar
        getResults={getResults}
        />
        <div className="results centerContainer">
          { noResults && 
            <div className="noResults">No matches found <span role="img" aria-label="sad smiley face">😥</span></div> 
          }
          { isLoading ?
          <Loading />
          : 
          <ul className="list">  
            {searchResults.map((item, i) =>
              <CardItem 
              cardData={item}
              setClickedItem={setClickedItem}
              key={i}
              />)
            }
          </ul>
          }
        </div>  
      </div>
      <Modal
      isVisible={modalIsVisible}
      itemDetails={isClickedItem}
      modalIsVisible={modalIsVisible}
      closeModal={() => { 
        modalIsVisible ? setModalIsVisible(false) : setModalIsVisible(true)
        setTimeout(() => {
          setClickedItem({})
        }, 500)
        }
      }
      />
    </div>
  );
}

export default App;