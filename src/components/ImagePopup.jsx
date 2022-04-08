import React from "react";

function ImagePopup(props, selectedCard) {
    console.log(selectedCard, 'selectedCard')
  return (
    <section onClick={props.onClose} 
      className={`popup ${
        props.card && "popup_opened"
      }`}
    >
      <div className="popup__image-container">
        <button className="popup__close" />
        <img
          className="popup__image"
          src={props.card.src}
          alt={props.card.title}
        />
        <figcaption className="popup__image-name">
          {props.card.title}
        </figcaption>
      </div>
    </section>
  );
}

export default ImagePopup;
