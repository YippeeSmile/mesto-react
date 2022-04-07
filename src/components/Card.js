import React from 'react';

function Card(props) {

    function handleClick() {
        console.log(props)
        props.handleCardClick({ src: props.src, title: props.title });

    }

    return ( <
        div className = "Card"
        onClick = { handleClick } >
        <
        li className = "gallery__item card" >
        <
        button type = "button"
        className = "gallery__delete-button" / >
        <
        img className = "gallery__image"
        src = { props.src }
        alt = { props.title }
        /> <
        div className = "gallery__description" >
        <
        h2 className = "gallery__title" > { props.title } < /h2> <
        div className = "gallery__description_side-right" >
        <
        button type = "button"
        className = "gallery__like-button" / >
        <
        span className = "gallery__like-button_count" > { props.likes } < /span> <
        /div> <
        /div> <
        /li> <
        /div>
    )
}

export default Card;