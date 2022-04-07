import React from 'react';
import Card from './Card';
//import avatar from '../images/сousteau.jpg';

function Main(props) {

    return ( <
        div className = "Main" >
        <
        main className = "content" >
        <
        section className = "profile" >
        <
        div className = "profile__avatar" >
        <
        button className = "profile__avatar-button"
        onClick = { props.onEditAvatar } > < /button> <
        img src = { props.avatar }
        className = "profile__image"
        alt = "Аватар" / >
        <
        /div> <
        div className = "profile__info" >
        <
        div className = "profile__text" >
        <
        h1 className = "profile__name" > { props.name } < /h1> <
        button className = "profile__edit-button"
        onClick = { props.onEditProfile } > < /button> <
        /div> <
        p className = "profile__further" > { props.about } < /p> <
        /div> <
        button className = "profile__add-button"
        onClick = { props.onAddPlace } > < /button> <
        /section> <
        section className = "gallery" >
        <
        ul className = "gallery__items" > {
            props.cards.map(card => {
                    return ( <
                        Card src = { card.link }
                        likes = { card.likes.length }
                        title = { card.name }
                        key = { card._id }
                        handleCardClick = { props.handleCardClick }
                        /> )
                    })
            } <
            /ul> <
            /section> <
            /main>

            <
            /div>
        );
    }

    export default Main;