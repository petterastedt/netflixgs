import React, { useState, useEffect } from 'react';
import './main.css';
import api from './api';
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

  const getResults = async (query) => {
    setNoResults(false) 
    setIsLoading(true)

    let output

    try {
      const localResults = await api.getLocalResults(query)

      const metaCheck = localResults.map(async res => {
        if (res.imdbId || res.imdbId === null) {
          console.log('Item up to date!') 
          return res
        } else {
          console.log('Update db item') 
          const updatedItem = await api.updateItem(res)     
          return updatedItem
        }
      })

      output = await Promise.all(metaCheck)

    } catch (error) {
      console.log('Error', error)
    }

    console.log("results :", output) 
    if (output.length < 1) {
      setNoResults(true) 
      setSearchResults([])
    } else {
      setAnimateHeader(true)
      setTimeout(() => {
        setSearchResults(output)
      }, 750);
    }

    setIsLoading(false)
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