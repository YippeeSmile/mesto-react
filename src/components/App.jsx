import React from 'react';
import '../index';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});

     //запрос на данные user
  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }, [])

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const handleUpdateUser = () => {
        api.editProfile()
        .then((res) => {
            setCurrentUser({ ...currentUser, name: res.name, about: res.about });
        })
        .catch((e) => console.error(e));
        }
    

    return ( 
      <CurrentUserContext.Provider value={currentUser}> 
        <div className = "page">
        <Header />
        <Main 
        onEditAvatar = {handleEditAvatarClick}
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditCardClick = {handleCardClick}
        //handleCardLike = {props.handleCardLike}
        //cards={cards}
        /> 
        <Footer />
        <EditProfilePopup 
        onUpdateUser = {handleUpdateUser}
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        />
        <ImagePopup 
        card = {selectedCard}
        onClose = {closeAllPopups}
        />
        <EditAvatarPopup
        onClose = {closeAllPopups}
        isOpen = {isEditAvatarPopupOpen} />
        <PopupWithForm 
        name = "card-edit"
        title = "Новое место"
        submitButtonValue = "Создать"
        onClose = {closeAllPopups}
        isOpen = {isAddPlacePopupOpen}
        formName = "edit-card" >
        <input id = "cardname"
        type = "text"
        name = "name"
        placeholder = "Название"
        minLength = "2"
        maxLength = "40"
        className = "popup__input popup__input_card-name"
        required />
        <span id = "cardname-error"
        className = "error-message error-message_visible" />
        <input id = "cardlink"
        type = "url"
        name = "link"
        placeholder = "Ссылка на картинку"
        className = "popup__input popup__input_card-link"
        required />
        <span id = "cardlink-error"
        className = "error-message error-message_visible" />
        </PopupWithForm> 
        <PopupWithForm name = "card-delete"
        title = "Вы уверены?"
        formName = "card-form"
        submitButtonValue = "Да" />
        </div>
    </CurrentUserContext.Provider> 
    );
}

export default App;