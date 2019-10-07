import React from 'react';

export default function Modal(props) {
  return (
    <div className={`modal ${props.isVisible ? "modal--isVisible" : ""}`}>
      <div className="modal-card">
        <img 
        className="modal-card-image"
        src={props.itemDetails.poster} 
        alt={`${props.itemDetails.title} movie poster`}/>
        <div className="modal-card-content">
          <div className="modal-card-topWrapper">
            <div 
            className="modal-card-content-close"
            onClick={props.closeModal}
            >+</div>
            <h2 className="modal-card-content-cardTitle">{`${props.itemDetails.title} (${props.itemDetails.year})`}</h2>
            <div className="modal-card-content-detailsWrapper">
              <span className="modal-card-content-runtime specialSpan">{props.itemDetails.runtime}</span>
              <span className="modal-card-content-genre specialSpan">{props.itemDetails.genre}</span>
              <span className="modal-card-content-imdbRating specialSpan">imdb: {props.itemDetails.imdbRating}</span>
            </div>
            <div className="modal-card-content-cast">
              <p className="modal-card-content-cast-director">{props.itemDetails.director}</p>
              <p className="modal-card-content-cast-actors">{props.itemDetails.actors}</p>
            </div>
            <p className="modal-card-content-plot">
              {props.itemDetails.plot}
            </p>
          </div>
          <div className="modal-card-bottomWrapper">
            <div className="modal-card-content-linksWrapper">
              <a href={`https://www.youtube.com/results?search_query=${props.itemDetails.title}+${props.itemDetails.year}+trainer`} target="_blank" rel="noopener noreferrer">Youtube</a>
              <a href={`https://www.imdb.com/title/${props.itemDetails.imdbId}`} target="_blank" rel="noopener noreferrer">Imdb</a>
              <a href="#">Link3</a>
            </div>
            <div className="modal-card-content-flagWrapper">
            {props.modalIsVisible ? props.itemDetails.countries.map((item, i) =>
            <img src={require(`../assets/icons/${item}.svg`)}
              key={i}
              alt={`Title available in ${item}`}
              title={`Title available in ${item}`}
              className="modal-card-content-flag"/>)
              : <p>nada</p>
            }
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}
