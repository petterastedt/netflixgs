import React, { useState } from 'react';

export default function Header(props) {
  const [counterIndex, setCounterIndex] = useState(0)
  const [countries] = useState([{ country: "Australian", code: "au"}, { country: "Brazilian", code: "br"}, { country: "Canadian", code: "ca"}, { country: "Costa Rican", code: "cr" }, { country: "Danish", code: "dk" }, { country: "Finish", code: "fi" }, { country: "Irish", code: "ie" }, { country: "Indian", code: "in" }, { country: "Norwegian", code: "no" }, { country: "New Zealand", code: "nz" }, { country: "Swedish", code: "se" }, { country: "Swiss", code: "sw" }, { country: "Taiwanese", code: "tw" }, { country: "UK", code: "uk" }, { country: "US", code: "us" }])

  const handleClick = () => {
    counterIndex < countries.length ? setCounterIndex(counterIndex+1) : setCounterIndex(0)    
  }

  return (
    <div className="header centerContainer">
      <div className="header-container">
        <h1 className="header-headline">NETFLIX GS</h1>
        <h2 className="header-subHeadline">Search in the 
          <span 
          className="header-selectDb specialSpan"
          onClick={() => {
            handleClick() 
            props.selectCountry(countries[counterIndex])}
          }
          >
          {!props.dbCountry ? "Global" : props.dbCountry.country}
          {/* <img src={require(`../assets/icons/${countries[counterIndex].code}.svg`)} /> */}
          </span>netflix database.
        </h2>
      </div>
      <div className="header-dbMenu"></div>
    </div>
  )
}
