import React from 'react'
import Card from './Card'
import { api } from '../utils/Api'
import { CurrentUserContext } from '../context/CurrentUserContext'

function Main(props) {
  const [cards, setCards] = React.useState([])
  const currentUserContext = React.useContext(CurrentUserContext); // подписываемся на контекст

  //запрос на данные cards
  React.useEffect(() => {
      api.getCards()
      .then((cards) => {
        setCards(cards)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }, [])

  return (
    <div className="Main">
      <main className="content">
        <section className="profile">
          <div className="profile__avatar">
            <button
              className="profile__avatar-button"
              onClick={props.onEditAvatar}
            ></button>
            <img src={currentUserContext.avatar} className="profile__image" alt="Аватар" />
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__name"> {currentUserContext.name} </h1>
              <button
                className="profile__edit-button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__further"> {currentUserContext.about} </p>
          </div>
          <button
            className="profile__add-button"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="gallery">
          <ul className="gallery__items">
            {cards.map((card) => {
              return (
                <Card
                  src={card.link}
                  likes={card.likes.length}
                  title={card.name}
                  key={card._id}
                  handleCardClick={props.onEditCardClick}
                />
              )
            })}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Main
