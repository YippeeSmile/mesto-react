import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext); // подписываемся на контекст
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
  `gallery__delete-button ${isOwn ? 'gallery__delete-button_visible' : 'gallery__delete-button_hidden'}`
); 

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `gallery__like-button ${isOwn ? 'gallery__like-button_visible' : 'gallery__like-button_hidden'}`
      ); 

    function handleClick() {
        props.handleCardClick({ src: props.src, title: props.title });
    }

    return ( <div className = "Card">
        <li className = "gallery__item card">
        <button type = "button"
        className ={cardDeleteButtonClassName} />
        <img className = "gallery__image"  onClick = { handleClick }
        src = { props.src }
        alt = { props.title }
        /> 
        <div className ="gallery__description">
        <h2 className ="gallery__title">{ props.title }</h2> 
        <div className ="gallery__description_side-right" >
        <button type ="button"
        className = {cardLikeButtonClassName} />
        <span className ="gallery__like-button_count">{ props.likes }</span> 
        </div> 
        </div>
        </li>
        </div>
    )
}

export default Card;