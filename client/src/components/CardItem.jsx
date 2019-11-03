import React, { useState, useEffect } from 'react';

export default function CardItem(props) {

  const [hasPoster, setHasPoster] = useState(false);

  useEffect(() => {
    if (!props.cardData.poster || !props.cardData.poster.startsWith("http")) setHasPoster(false)
    else setHasPoster(true)
  }, [props.cardData])

  return (
    <li className="cardItem">
      <div className="cardItem-cardWrapper">
        <div
          className={`cardItem-imgWrapper ${!hasPoster && "cardItem-imgWrapper--hasNoPoster"}`}
          onClick={() => props.setClickedItem(props.cardData)}>
          {hasPoster ?
          <img 
            className="cardItem-poster"
            src={props.cardData.poster}
            alt={`${props.cardData.title} movie poster`}
          />
          : <div className="cardItem-noPoster">No poster found <span role="img" aria-label="disappointed smiley face">😞</span></div>
          }
          <span className="cardItem-flags">
          {props.cardData.countries.map((item, i) =>
            <img src={require(`../assets/icons/${item}.svg`)}
            alt={`Title available in ${item}`}
            title={`Title available in ${item}`}
            key={i}
            className="cardItem-flag"/>
          )}
          </span>
        </div>
      </div>
      <span className="cardItem-title">
        {props.cardData.title} ({props.cardData.year})
      </span>
    </li> 
  )
}
