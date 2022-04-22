import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext'

function Card(card, props) {

    const currentUser = React.useContext(CurrentUserContext); // подписываемся на контекст
    
    const isOwn = card.owner._id === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
    `gallery__delete-button ${isOwn ? 'gallery__delete-button_visible' : 
    'gallery__delete-button_hidden'}`); 
    
    const isLiked = card.hasLikes.some((item) => item._id === currentUser._id);
    
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
    `gallery__like-button ${isLiked ? 'gallery__like-button_visible' :
    'gallery__like-button_hidden' }`);

    function handleClick() {
        props.handleCardClick({ src: card.src, title: card.title });
    }

    return ( <div className = "card">
        <li className = "gallery__item card">
        <button type = "button"
        className = {cardDeleteButtonClassName} />
        <img className = "gallery__image"  onClick = { handleClick }
        src = { card.src }
        alt = { card.title }
        /> 
        <div className ="gallery__description">
        <h2 className ="gallery__title">{ card.title }</h2> 
        <div className ="gallery__description_side-right" >
        <button type ="button"
        className = {cardLikeButtonClassName} />
        <span className ="gallery__like-button_count">{ card.likes }</span> 
        </div> 
        </div>
        </li>
        </div>
    )
}

export default Card;