import React from 'react';
import {useEffect, useState} from 'react';
import '../index';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(
    false,
  )
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(
    false,
  )
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  //запрос на данные user's и cards 
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
    .then(([res, cards]) => {
        setCurrentUser(res)
        setCards(cards)
    })
     .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }, [])

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (obj) => {
    setSelectedCard(obj)
  }

  const handleUpdateUser = (obj) => {
    api
      .editProfile(obj.name, obj.about)
      .then((res) => {
        setCurrentUser({ ...currentUser, name: res.name, about: res.about })
      })
      .catch((e) => console.error(e))
  }

  const handleUpdateAvatar = (obj) => {
    api
      .changeAvatar(obj.avatar)
      .then((res) => {
        setCurrentUser({ ...currentUser, avatar: res.avatar })
      })
      .catch((e) => console.error(e))
  }

  const handleAddPlaceSubmit = (card) => {
    api
      .addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .catch((e) => console.error(e))
  }

  //про карточки

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((item) => item._id === currentUser._id)
    // Отправляем запрос в API и получаем обновлённые данные карточкиs
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((c) => {
        setCards((cards) =>
          cards.map((item) => (item._id === card._id ? c : item)),
        )
      })
      .catch((e) => console.error(e))
  }

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((item) => item._id !== card._id))
      })
      .catch((e) => console.error(e))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          handleCardClick={handleCardClick}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
        />
        <AddPlacePopup
          onAddPlaceSubmit={handleAddPlaceSubmit}
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
        />
        <PopupWithForm
          onClose={closeAllPopups}
          name="card-delete"
          title="Вы уверены?"
          formName="card-form"
          submitButtonValue="Да"
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
