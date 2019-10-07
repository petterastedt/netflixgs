import React from 'react';

export default function CardItem(props) {

  return (
    <li className="cardItem">
      <div className="cardItem-cardWrapper">
        <div className="cardItem-imgWrapper">
          <img 
            className="cardItem-poster"
            src={props.cardData.poster ? props.cardData.poster : `https://via.placeholder.com/300x450?text=No+poster+found`}
            alt={`${props.cardData.title} movie poster`}
            onClick={() => props.setClickedItem(props.cardData)}
          />
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
