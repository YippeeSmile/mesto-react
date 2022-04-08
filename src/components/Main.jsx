import React from 'react'
import Card from './Card'
import { api } from '../utils/Api'

function Main(props) {
  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  //запрос на данные user's и cards
  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getCards()])
      .then(([res, cards]) => {
        setUserName(res.name)
        setUserDescription(res.about)
        setUserAvatar(res.avatar)
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
            <img src={userAvatar} className="profile__image" alt="Аватар" />
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__name"> {userName} </h1>
              <button
                className="profile__edit-button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__further"> {userDescription} </p>
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
